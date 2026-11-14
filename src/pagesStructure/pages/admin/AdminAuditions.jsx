const auditions = [
    {
      id: 1,
      narrator: "عمر الحربي",
      project: "ظلال النخيل",
      submitted: "18 مايو",
      status: "مقبولة",
    },
    {
      id: 2,
      narrator: "ليان منصور",
      project: "ظلال النخيل",
      submitted: "17 مايو",
      status: "غير مختارة",
    },
    {
      id: 3,
      narrator: "خالد المصري",
      project: "مرافئ بعيدة",
      submitted: "15 مايو",
      status: "قيد المراجعة",
    },
  ];
  
  function AdminAuditions() {
    return (
      <section className="page-section">
        <h1>مراقبة تجارب الأداء</h1>
  
        <input
          className="books-search"
          type="search"
          placeholder="بحث في السجلات..."
        />
  
        <select defaultValue="الكل">
          <option value="الكل">كل الحالات</option>
          <option value="مقبولة">مقبولة</option>
          <option value="غير مختارة">غير مختارة</option>
          <option value="قيد المراجعة">قيد المراجعة</option>
        </select>
  
        <button className="button" type="button">
          تصفية
        </button>
  
        <div className="books-table-wrap">
          <table className="books-table">
            <thead>
              <tr>
                <th>الراوي</th>
                <th>المشروع</th>
                <th>تاريخ الإرسال</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
  
            <tbody>
              {auditions.map((audition) => (
                <tr key={audition.id}>
                  <td>{audition.narrator}</td>
                  <td>{audition.project}</td>
                  <td>{audition.submitted}</td>
                  <td>{audition.status}</td>
                  <td>
                    <button
                      className="button button-secondary"
                      type="button"
                    >
                      عرض التفاصيل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  export default AdminAuditions;