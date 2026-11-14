import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { RECORDING_MAX_MB, findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import AudioPlayer from "../../components/AudioPlayer";
import AudioFileInput from "../../components/AudioFileInput";
import { assignmentStatus, formatDate, formatMoney, formatSize, splitPayment } from "../../utils/narratorHelpers";
import { getAudioUrl } from "../../utils/useNarratorStore";

function ProjectWork() {
  const { projectId } = useParams();
  const { state, uploadRecordings, declineProject } = useNarrator();

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDecline, setConfirmDecline] = useState(false);

  const project = findProject(projectId);
  const assignment = state.assignments.find((a) => a.projectId === projectId);

  if (!project || !assignment) {
    return (
      <div className="nr-card nr-empty-card">
        <h1 className="nr-empty-title">لا يمكنك الوصول إلى هذا المشروع</h1>
        <p className="nr-empty">هذا المشروع غير موجود أو غير مسند إليك.</p>
        <Link className="button button-dark" to="/narrator/my-projects">العودة لمشاريعي</Link>
      </div>
    );
  }

  const canUpload = ["in-progress", "changes-requested"].includes(assignment.status);
  const canDecline = assignment.status === "in-progress";

  const handleUpload = (event) => {
    event.preventDefault();
    if (files.length === 0) {
      setError("اختر ملفاً صوتياً واحداً على الأقل.");
      return;
    }
    uploadRecordings(project.id, files);
    setFiles([]);
    setError("");
    setMessage("تم رفع التسجيلات وإرسالها للمؤلف للمراجعة.");
  };

  return (
    <>
      <Link className="nr-back" to="/narrator/my-projects">→ العودة لمشاريعي</Link>

      <PageHeader eyebrow={`${project.title} · FR-N8 · FR-N9`} title="تسليمات الكتاب الصوتي">
        <StatusBadge status={assignmentStatus(assignment)} />
      </PageHeader>

      {assignment.status === "changes-requested" && (
        <div className="nr-note" role="status">
          <strong>ملاحظات المؤلف:</strong> {assignment.authorComment}
        </div>
      )}
      {message && <p className="form-success nr-page-alert" role="status">{message}</p>}

      <div className="nr-detail-grid">
        <div className="nr-stack">
          <section className="nr-card">
            <h2>الملفات المسلّمة ({assignment.recordings.length})</h2>
            {assignment.recordings.length === 0 ? (
              <p className="nr-empty nr-gap">لم ترفع أي تسجيل بعد.</p>
            ) : (
              <ul className="nr-list nr-gap">
                {assignment.recordings.map((rec) => (
                  <li key={rec.id}>
                    <AudioPlayer src={getAudioUrl(rec.id)} title={rec.fileName} />
                    <small className="nr-muted">{formatSize(rec.size)} · رُفع في {formatDate(rec.uploadedAt)}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="nr-card">
            <h2>متطلبات السرد</h2>
            <dl className="nr-meta nr-meta-grid">
              <div><dt>المؤلف</dt><dd>{project.author}</dd></div>
              <div><dt>اللهجة</dt><dd>{project.dialect}</dd></div>
              <div><dt>النبرة</dt><dd>{project.voiceStyle}</dd></div>
              <div><dt>الفصول</dt><dd>{project.chapters}</dd></div>
              <div><dt>موعد التسليم</dt><dd>{formatDate(project.deadline)}</dd></div>
              <div><dt>صافي أجرك</dt><dd>{formatMoney(splitPayment(project.fee).net)}</dd></div>
            </dl>
            <p className="nr-text">{project.instructions}</p>
          </section>
        </div>

        <aside className="nr-stack nr-side">
          {canUpload ? (
            <form className="nr-card nr-form" onSubmit={handleUpload} noValidate>
              <h2>{assignment.status === "changes-requested" ? "رفع التسجيل المعدّل" : "رفع التسجيلات"}</h2>
              <p className="nr-muted nr-text">ارفع الكتاب كاملاً أو فصلاً فصلاً. ستصل التسجيلات للمؤلف للمراجعة.</p>
              <AudioFileInput
                maxMb={RECORDING_MAX_MB}
                multiple
                files={files}
                onChange={(next) => { setFiles(next); setError(""); setMessage(""); }}
              />
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-dark nr-full" type="submit">إرسال التسجيلات</button>
            </form>
          ) : (
            <div className="nr-card">
              <h2>حالة المشروع</h2>
              <p className="nr-text">
                {assignment.status === "delivered" && "تم التسليم. بانتظار مراجعة المؤلف واعتماده."}
                {assignment.status === "completed" && "اكتمل المشروع وتم تحويل المستحقات."}
                {assignment.status === "declined" && "اعتذرت عن هذا المشروع وأُعيد فتحه للتجارب."}
              </p>
              <Link className="button button-outline nr-full" to="/narrator/payments">عرض المدفوعات</Link>
            </div>
          )}

          {canDecline && (
            <div className="nr-card">
              {confirmDecline ? (
                <>
                  <p className="nr-text"><strong>هل أنت متأكد؟</strong> سيُعاد فتح المشروع للتجارب ويتم إبلاغ المؤلف.</p>
                  <div className="nr-actions">
                    <button
                      type="button"
                      className="button button-dark nr-rec-stop"
                      onClick={() => { declineProject(project.id); setConfirmDecline(false); }}
                    >
                      تأكيد الاعتذار
                    </button>
                    <button type="button" className="button button-outline" onClick={() => setConfirmDecline(false)}>
                      تراجع
                    </button>
                  </div>
                </>
              ) : (
                <button type="button" className="nr-text-button nr-danger" onClick={() => setConfirmDecline(true)}>
                  الاعتذار عن المشروع
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export default ProjectWork;