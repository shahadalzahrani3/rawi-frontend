import { Link } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { assignmentStatus, formatDate } from "../../utils/narratorHelpers";

const ORDER = ["changes-requested", "in-progress", "delivered", "completed", "declined"];

function MyProjects() {
  const { state } = useNarrator();

  const items = [...state.assignments].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)
  );

  return (
    <>
      <PageHeader eyebrow="FR-N8" title="مشاريعي المقبولة" />

      {items.length === 0 ? (
        <div className="nr-card nr-empty-card">
          <p className="nr-empty">لا توجد مشاريع مسندة إليك بعد. عند قبول تجربة أداء سيظهر المشروع هنا.</p>
        </div>
      ) : (
        <div className="nr-work-grid">
          {items.map((item) => {
            const project = findProject(item.projectId);
            const needsChanges = item.status === "changes-requested";
            return (
              <article className={`nr-card nr-work ${item.status === "declined" ? "is-faded" : ""}`} key={item.projectId}>
                <div className="nr-project-top">
                  <div className="nr-cover" aria-hidden="true">{project.title.charAt(0)}</div>
                  <div className="nr-project-main">
                    <StatusBadge status={assignmentStatus(item)} />
                    <h3>{project.title}</h3>
                    <p className="nr-project-desc">
                      {needsChanges
                        ? item.authorComment
                        : `${project.chapters} فصلاً · ${project.dialect} · نبرة ${project.voiceStyle}`}
                    </p>
                  </div>
                </div>

                {item.status === "in-progress" && (
                  <div className="nr-progress" role="progressbar" aria-valuenow={item.progress} aria-valuemin="0" aria-valuemax="100">
                    <span style={{ width: `${item.progress}%` }} />
                  </div>
                )}

                <p className="nr-work-deadline">موعد التسليم: {formatDate(project.deadline)}</p>

                <Link className="button button-dark nr-full" to={`/narrator/my-projects/${project.id}`}>
                  {needsChanges ? "عرض الملاحظات" : "فتح المشروع"}
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

export default MyProjects;