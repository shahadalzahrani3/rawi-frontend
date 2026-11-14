const deliveries = [
    {
      id: 1,
      project: "رحلة إلى الأندلس",
      narrator: "عمر الحربي",
      submitted: "20 مايو",
      status: "بانتظار المؤلف",
    },
    {
      id: 2,
      project: "ظلال النخيل",
      narrator: "ليان منصور",
      submitted: "18 مايو",
      status: "تعديلات مطلوبة",
    },
    {
      id: 3,
      project: "مدن لا تنام",
      narrator: "خالد المصري",
      submitted: "12 مايو",
      status: "معتمد",
    },
  ];
  
  function AdminDeliveries() {
    return (
      <section className="page-section">
        <h1>مراقبة التسليمات</h1>
  
        <input
          className="books-search"
          type="search"
          placeholder="بحث في السجلات..."
        />
  
        <select defaultValue="الكل">
          <option value="الكل">كل الحالات</option>
          <option value="بانتظار المؤلف">بانتظار المؤلف</option>
          <option value="تعديلات مطلوبة">تعديلات مطلوبة</option>
          <option value="معتمد">معتمد</option>
        </select>
  
        <button className="button" type="button">
          تصفية
        </button>
  
        <div className="books-table-wrap">
          <table className="books-table">
            <thead>
              <tr>
                <th>المشروع</th>
                <th>الراوي</th>
                <th>تاريخ التسليم</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
  
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.project}</td>
                  <td>{delivery.narrator}</td>
                  <td>{delivery.submitted}</td>
                  <td>{delivery.status}</td>
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
  export default AdminDeliveries;