import { Link } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import {
  assignmentStatus,
  formatMoney,
  formatRelative,
  splitPayment
} from "../../utils/narratorHelpers";

function daysUntil(date) {
  return Math.ceil((new Date(date) - Date.now()) / 86400000);
}

function NarratorDashboard() {
  const { state } = useNarrator();
  const { profile, auditions, assignments, notifications } = state;
  const firstName = profile.name.split(" ")[0];

  const pendingCount = auditions.filter((a) => a.status === "Pending").length;
  const acceptedCount = auditions.filter((a) => a.status === "Accepted").length;

  const activeWork = assignments.filter((a) =>
    ["in-progress", "changes-requested"].includes(a.status)
  );
  const nextDeadline = activeWork
    .map((a) => findProject(a.projectId).deadline)
    .sort()[0];

  const totalPaid = assignments
    .filter((a) => a.paidAt)
    .reduce((sum, a) => sum + splitPayment(findProject(a.projectId).fee).net, 0);

  const currentWork = assignments.filter((a) => a.status !== "declined");

  const stats = [
    { label: "تجارب مرسلة", value: auditions.length, note: `${pendingCount} قيد المراجعة` },
    { label: "مشاريع مقبولة", value: acceptedCount, note: `${assignments.length} مشاريع مسندة` },
    {
      label: "عمل جارٍ",
      value: activeWork.length,
      note: nextDeadline ? `التسليم بعد ${Math.max(daysUntil(nextDeadline), 0)} أيام` : "لا يوجد عمل جارٍ"
    },
    { label: "إجمالي المدفوعات", value: formatMoney(totalPaid), note: "بعد خصم العمولة" }
  ];

  return (
    <>
      <PageHeader
        eyebrow="لوحة التحكم"
        title={`مرحباً، ${firstName}`}
        subtitle="استمر في بناء مكتبتك الصوتية ومتابعة أعمالك."
      >
        <Link className="button button-dark" to="/narrator/projects">
          اكتشف المشاريع
        </Link>
      </PageHeader>

      <div className="nr-stats">
        {stats.map((stat) => (
          <article className="nr-card nr-stat" key={stat.label}>
            <h2>{stat.label}</h2>
            <p className="nr-stat-value">{stat.value}</p>
            <p className="nr-stat-note">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="nr-dash-grid">
        <section className="nr-card">
          <div className="nr-card-head">
            <h2>الأعمال الحالية</h2>
            <Link to="/narrator/my-projects">عرض الكل</Link>
          </div>

          {currentWork.length === 0 ? (
            <p className="nr-empty">لا توجد أعمال حالية بعد.</p>
          ) : (
            <table className="nr-table">
              <thead>
                <tr>
                  <th>المشروع</th>
                  <th>الحالة</th>
                  <th>آخر تحديث</th>
                </tr>
              </thead>
              <tbody>
                {currentWork.map((item) => {
                  const project = findProject(item.projectId);
                  const lastUpdate =
                    item.paidAt || item.recordings.at(-1)?.uploadedAt || project.postedAt;
                  return (
                    <tr key={item.projectId}>
                      <td data-label="المشروع">{project.title}</td>
                      <td data-label="الحالة">
                        <StatusBadge status={assignmentStatus(item)} />
                      </td>
                      <td data-label="آخر تحديث">{formatRelative(lastUpdate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        <section className="nr-card">
          <div className="nr-card-head">
            <h2>التنبيهات</h2>
          </div>

          {notifications.length === 0 ? (
            <p className="nr-empty">لا توجد تنبيهات جديدة.</p>
          ) : (
            <ul className="nr-notes">
              {notifications.slice(0, 4).map((note) => (
                <li key={note.id}>
                  <strong>{note.title}</strong>
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default NarratorDashboard;