import { useState } from "react";
import { Link } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import { findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { AUDITION_STATUS, formatDate, formatRelative } from "../../utils/narratorHelpers";

const TABS = ["all", "Pending", "Accepted", "Rejected"];

function MyAuditions() {
  const { state } = useNarrator();
  const [tab, setTab] = useState("all");

  const count = (status) =>
    status === "all" ? state.auditions.length : state.auditions.filter((a) => a.status === status).length;

  const shown = state.auditions
    .filter((a) => tab === "all" || a.status === tab)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

  return (
    <>
      <PageHeader eyebrow="FR-N7" title="تجارب الأداء الخاصة بي" />

      <div className="nr-tabs nr-page-tabs" role="tablist">
        {TABS.map((key) => (
          <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
            {key === "all" ? "الكل" : AUDITION_STATUS[key].label} ({count(key)})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="nr-card nr-empty-card">
          <p className="nr-empty">لا توجد تجارب أداء في هذا التصنيف.</p>
          <Link className="button button-dark" to="/narrator/projects">تصفح المشاريع</Link>
        </div>
      ) : (
        <div className="nr-card nr-table-card">
          <table className="nr-table">
            <thead>
              <tr>
                <th>المشروع</th>
                <th>تاريخ الإرسال</th>
                <th>الحالة</th>
                <th>آخر تحديث</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((audition) => {
                const project = findProject(audition.projectId);
                const isAccepted = audition.status === "Accepted";
                return (
                  <tr key={audition.id}>
                    <td data-label="المشروع">{project.title}</td>
                    <td data-label="تاريخ الإرسال">{formatDate(audition.submittedAt)}</td>
                    <td data-label="الحالة"><StatusBadge status={AUDITION_STATUS[audition.status]} /></td>
                    <td data-label="آخر تحديث">{formatRelative(audition.updatedAt)}</td>
                    <td data-label="الإجراء">
                      <Link
                        className="nr-text-link"
                        to={isAccepted ? `/narrator/my-projects/${project.id}` : `/narrator/projects/${project.id}`}
                      >
                        {isAccepted ? "فتح المشروع ←" : "التفاصيل ←"}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default MyAuditions;