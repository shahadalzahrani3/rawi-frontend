import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { SAMPLE_MAX_MB, findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import AudioFileInput from "../../components/AudioFileInput";
import VoiceRecorder from "../../components/VoiceRecorder";
import { AUDITION_STATUS, formatDate, formatMoney } from "../../utils/narratorHelpers";

function ProjectDetails() {
  const { projectId } = useParams();
  const { state, submitAudition } = useNarrator();

  const [mode, setMode] = useState("upload");
  const [files, setFiles] = useState([]);
  const [recorded, setRecorded] = useState(null);
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const project = findProject(projectId);
  const existing = state.auditions.find((a) => a.projectId === projectId);

  if (!project || !project.approved || (!project.open && !existing)) {
    return (
      <div className="nr-card nr-empty-card">
        <h1 className="nr-empty-title">المشروع غير متاح</h1>
        <p className="nr-empty">ربما أُغلق باب التجارب أو أُزيل المشروع.</p>
        <Link className="button button-dark" to="/narrator/projects">العودة للمشاريع</Link>
      </div>
    );
  }

  const audioFile = mode === "upload" ? files[0] : recorded;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!project.open) {
      setError("انتهت فترة التقديم لهذا المشروع.");
      return;
    }
    if (!audioFile) {
      setError(mode === "upload" ? "يرجى رفع ملف تجربة الأداء." : "يرجى تسجيل تجربة الأداء أولاً.");
      return;
    }
    if (!confirmed) {
      setError("يرجى تأكيد أن التسجيل بصوتك.");
      return;
    }

    submitAudition(project.id, audioFile, note.trim());
    setSubmitted(true);
    setError("");
  };

  const switchMode = (next) => {
    setMode(next);
    setError("");
  };

  return (
    <>
      <Link className="nr-back" to="/narrator/projects">→ العودة للمشاريع</Link>

      <PageHeader eyebrow={`FR-N5 · ${project.genre}`} title={project.title} subtitle={`بقلم ${project.author}`}>
        {existing && <StatusBadge status={AUDITION_STATUS[existing.status]} />}
      </PageHeader>

      <div className="nr-detail-grid">
        <div className="nr-stack">
          <section className="nr-card">
            <h2>عن الكتاب</h2>
            <p className="nr-text">{project.description}</p>
            <dl className="nr-meta nr-meta-grid">
              <div><dt>اللهجة</dt><dd>{project.dialect}</dd></div>
              <div><dt>متطلبات السرد</dt><dd>{project.voiceStyle}</dd></div>
              <div><dt>صوت الراوي</dt><dd>{project.gender}</dd></div>
              <div><dt>الفصول</dt><dd>{project.chapters}</dd></div>
              <div><dt>المدة</dt><dd>{project.hours} ساعات</dd></div>
              <div><dt>الميزانية</dt><dd>{formatMoney(project.fee)}</dd></div>
            </dl>
            <p className="nr-muted nr-deadline">آخر موعد: {formatDate(project.deadline)}</p>
          </section>

          <section className="nr-card">
            <h2>نص تجربة الأداء</h2>
            <blockquote className="nr-passage">{project.passage}</blockquote>
            <h3 className="nr-subhead">التعليمات</h3>
            <p className="nr-text">{project.instructions}</p>
          </section>
        </div>

        <aside className="nr-card nr-side">
          {existing || submitted ? (
            <>
              <h2>تجربتك</h2>
              {submitted && (
                <p className="form-success" role="status">تم إرسال تجربة الأداء بنجاح. حالتها: قيد المراجعة.</p>
              )}
              <p className="nr-text">
                أُرسلت في {formatDate(existing?.submittedAt)}.
              </p>
              <Link className="button button-dark nr-full" to="/narrator/auditions">متابعة حالة التجربة</Link>
            </>
          ) : (
            <form className="nr-form" onSubmit={handleSubmit} noValidate>
              <h2>تقديم تجربة أداء</h2>
              <p className="nr-muted nr-text">سجّل نص تجربة الأداء أو ارفع ملفاً جاهزاً.</p>

              <div className="nr-tabs" role="tablist">
                <button type="button" role="tab" aria-selected={mode === "upload"} onClick={() => switchMode("upload")}>
                  رفع ملف
                </button>
                <button type="button" role="tab" aria-selected={mode === "record"} onClick={() => switchMode("record")}>
                  تسجيل مباشر
                </button>
              </div>

              {mode === "upload" ? (
                <AudioFileInput maxMb={SAMPLE_MAX_MB} files={files} onChange={(next) => { setFiles(next); setError(""); }} />
              ) : (
                <VoiceRecorder onRecorded={(file) => { setRecorded(file); setError(""); }} />
              )}

              <label>
                رسالة للمؤلف (اختياري)
                <textarea value={note} maxLength={300} onChange={(e) => setNote(e.target.value)} placeholder="مثال: لدي خبرة في الروايات التاريخية..." />
              </label>

              <label className="nr-check">
                <input type="checkbox" checked={confirmed} onChange={(e) => { setConfirmed(e.target.checked); setError(""); }} />
                أؤكد أن هذا التسجيل بصوتي وليس مولّداً بالذكاء الاصطناعي.
              </label>

              {error && <p className="form-error" role="alert">{error}</p>}

              <button className="button button-dark nr-full" type="submit">إرسال التجربة</button>
            </form>
          )}
        </aside>
      </div>
    </>
  );
}

export default ProjectDetails;