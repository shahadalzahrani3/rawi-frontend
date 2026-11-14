const projects = [
    {
      id: 1,
      project: "ظلال النخيل",
      author: "سارة العتيبي",
      narrator: "عمر الحربي",
      progress: "65%",
    },
    {
      id: 2,
      project: "مرافئ بعيدة",
      author: "هند القحطاني",
      narrator: "ليان منصور",
      progress: "30%",
    },
    {
      id: 3,
      project: "مدن لا تنام",
      author: "ماجد سالم",
      narrator: "خالد المصري",
      progress: "بانتظار التسليم",
    },
  ];
  
  function AdminProjects() {
    return (
      <section className="page-section">
        <h1>المشاريع الجارية</h1>
  
        <input
          className="books-search"
          type="search"
          placeholder="بحث في السجلات..."
        />
  
        <select defaultValue="الكل">
          <option value="الكل">كل الحالات</option>
          <option value="قيد التنفيذ">قيد التنفيذ</option>
          <option value="بانتظار التسليم">بانتظار التسليم</option>
        </select>
  
        <button className="button" type="button">
          تصفية
        </button>
  
        <div className="books-table-wrap">
          <table className="books-table">
            <thead>
              <tr>
                <th>المشروع</th>
                <th>المؤلف</th>
                <th>الراوي</th>
                <th>التقدم</th>
                <th>الإجراء</th>
              </tr>
            </thead>
  
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.project}</td>
                  <td>{project.author}</td>
                  <td>{project.narrator}</td>
                  <td>{project.progress}</td>
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

  export default AdminProjects;