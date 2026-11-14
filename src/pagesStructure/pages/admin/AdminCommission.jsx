import { useState } from "react";

function AdminCommission() {
  const [commission, setCommission] = useState(15);
  const [newCommission, setNewCommission] = useState("15");

  function saveCommission() {
    setCommission(newCommission);
  }

  function handleCommissionChange(event) {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setNewCommission(value);
    }
  }

  return (
    <section className="page-section">
      <h1>عمولة المنصة</h1>

      <div className="commission-layout">
        <article className="dashboard-card">
          <h2>العمولة الحالية</h2>
          <p>{commission}%</p>
        </article>

        <article className="upload-form">
          <h2>تعديل العمولة</h2>

          <label>نسبة العمولة الجديدة (%)</label>

          <input
            type="text"
            inputMode="numeric"
            value={newCommission}
            onChange={handleCommissionChange}
          />

          <label>سبب التعديل</label>

          <textarea placeholder="اكتب سبب التعديل..." />

          <p>
            لن يؤثر التعديل في العقود والمدفوعات الحالية.
          </p>

          <button
            className="button"
            type="button"
            onClick={saveCommission}
          >
            حفظ التغييرات
          </button>
        </article>
      </div>
    </section>
  );
}
export default AdminCommission;