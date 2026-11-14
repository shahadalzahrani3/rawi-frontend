import { useNarrator } from "../../context/NarratorContext";
import { COMMISSION_RATE, findProject } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { formatMoney, paymentStatus, splitPayment } from "../../utils/narratorHelpers";

function Payments() {
  const { state } = useNarrator();

  const rows = state.assignments
    .filter((a) => a.status !== "declined")
    .map((assignment) => {
      const project = findProject(assignment.projectId);
      return { project, ...splitPayment(project.fee), status: paymentStatus(assignment) };
    });

  const sumBy = (key) =>
    rows.filter((r) => r.status.key === key).reduce((sum, r) => sum + r.net, 0);
  const countBy = (key) => rows.filter((r) => r.status.key === key).length;

  const lateCount = countBy("late");

  const cards = [
    { label: "إجمالي المستلم", value: formatMoney(sumBy("paid")), note: `من ${countBy("paid")} مشاريع` },
    { label: "قيد المعالجة", value: formatMoney(sumBy("processing")), note: "يصل خلال 2–3 أيام" },
    {
      label: "متأخر",
      value: formatMoney(sumBy("late")),
      note: lateCount ? `${lateCount} دفعات متأخرة` : "لا توجد دفعات متأخرة"
    }
  ];

  return (
    <>
      <PageHeader eyebrow="FR-N10" title="المدفوعات" />

      <div className="nr-stats nr-stats-3">
        {cards.map((card) => (
          <article className="nr-card nr-stat" key={card.label}>
            <h2>{card.label}</h2>
            <p className="nr-stat-value">{card.value}</p>
            <p className="nr-stat-note">{card.note}</p>
          </article>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="nr-card nr-empty-card">
          <p className="nr-empty">لا توجد مدفوعات بعد.</p>
        </div>
      ) : (
        <div className="nr-card nr-table-card">
          <table className="nr-table">
            <thead>
              <tr>
                <th>المشروع</th>
                <th>المبلغ المتفق</th>
                <th>عمولة المنصة ({Math.round(COMMISSION_RATE * 100)}%)</th>
                <th>صافي المستحق</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.project.id}>
                  <td data-label="المشروع">{row.project.title}</td>
                  <td data-label="المبلغ المتفق">{formatMoney(row.project.fee)}</td>
                  <td data-label="عمولة المنصة">{formatMoney(row.commission)}</td>
                  <td data-label="صافي المستحق">{formatMoney(row.net)}</td>
                  <td data-label="الحالة"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="nr-footnote">
        لا يمكن للراوي الاطلاع إلا على مدفوعاته المرتبطة بمشاريعه. تتحدث الحالة بعد نجاح معالجة المؤلف للدفع.
      </p>
    </>
  );
}

export default Payments;