import { Link, useSearchParams } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { DIALECTS, GENRES, VOICE_STYLES, projects } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import { formatDate, formatMoney } from "../../utils/narratorHelpers";

const SORTS = {
  newest: { label: "الأحدث", compare: (a, b) => b.postedAt.localeCompare(a.postedAt) },
  deadline: { label: "أقرب موعد", compare: (a, b) => a.deadline.localeCompare(b.deadline) },
  budget: { label: "الأعلى ميزانية", compare: (a, b) => b.fee - a.fee }
};

function BrowseProjects() {
  const { state } = useNarrator();
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const genre = params.get("genre") || "";
  const dialect = params.get("dialect") || "";
  const style = params.get("style") || "";
  const sort = SORTS[params.get("sort")] ? params.get("sort") : "newest";

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const appliedIds = new Set(state.auditions.map((a) => a.projectId));
  const available = projects.filter((p) => p.approved && p.open);

  const term = query.trim().toLowerCase();
  const results = available
    .filter((p) => {
      const matchesText =
        !term || [p.title, p.genre, p.author].some((text) => text.toLowerCase().includes(term));
      return (
        matchesText &&
        (!genre || p.genre === genre) &&
        (!dialect || p.dialect === dialect) &&
        (!style || p.voiceStyle === style)
      );
    })
    .sort(SORTS[sort].compare);

  const hasFilters = Boolean(query || genre || dialect || style);

  return (
    <>
      <PageHeader eyebrow="مشاريع معتمدة ومتاحة فقط" title="اكتشف مشاريع الكتب" />

      <div className="nr-card nr-filters" role="search">
        <input
          type="search"
          placeholder="ابحث بعنوان الكتاب أو التصنيف..."
          value={query}
          onChange={(e) => setParam("q", e.target.value)}
          aria-label="بحث"
        />
        <select value={genre} onChange={(e) => setParam("genre", e.target.value)} aria-label="التصنيف">
          <option value="">كل التصنيفات</option>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={dialect} onChange={(e) => setParam("dialect", e.target.value)} aria-label="اللهجة">
          <option value="">كل اللهجات</option>
          {DIALECTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={style} onChange={(e) => setParam("style", e.target.value)} aria-label="متطلبات السرد">
          <option value="">متطلبات السرد</option>
          {VOICE_STYLES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={(e) => setParam("sort", e.target.value)} aria-label="الترتيب">
          {Object.entries(SORTS).map(([key, option]) => (
            <option key={key} value={key}>ترتيب: {option.label}</option>
          ))}
        </select>
        <button
          type="button"
          className="button button-outline"
          onClick={() => setParams({}, { replace: true })}
          disabled={!hasFilters && sort === "newest"}
        >
          مسح الفلاتر
        </button>
      </div>

      <p className="nr-muted nr-result-count" aria-live="polite">
        {results.length} مشروع متاح
      </p>

      {results.length === 0 ? (
        <div className="nr-card nr-empty-card">
          <p className="nr-empty">
            {available.length === 0
              ? "لا توجد مشاريع متاحة حالياً."
              : "لا توجد مشاريع تطابق بحثك. جرّب تغيير الفلاتر."}
          </p>
        </div>
      ) : (
        <div className="nr-project-grid">
          {results.map((project) => (
            <article className="nr-card nr-project" key={project.id}>
              <div className="nr-project-top">
                <div className="nr-cover" aria-hidden="true">{project.title.charAt(0)}</div>
                <div className="nr-project-main">
                  <div className="nr-tags">
                    <span className="nr-badge nr-badge-muted">{project.genre}</span>
                    {appliedIds.has(project.id) ? (
                      <span className="nr-badge nr-badge-info">تم التقديم</span>
                    ) : (
                      <span className="nr-badge nr-badge-success">متاح</span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="nr-project-desc">{project.description}</p>
                </div>
              </div>

              <dl className="nr-meta">
                <div><dt>اللهجة</dt><dd>{project.dialect}</dd></div>
                <div><dt>المدة</dt><dd>{project.hours} ساعات</dd></div>
                <div><dt>الميزانية</dt><dd>{formatMoney(project.fee)}</dd></div>
              </dl>
              <p className="nr-muted nr-deadline">آخر موعد: {formatDate(project.deadline)}</p>

              <Link className="button button-dark nr-full" to={`/narrator/projects/${project.id}`}>
                عرض التفاصيل
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default BrowseProjects;