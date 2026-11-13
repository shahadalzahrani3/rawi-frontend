function AdminDashboard() {
    return (
      <section className="page-section">
        <h1>نظرة عامة على المنصة</h1>
  
        <div className="dashboard-grid">
  
          <article className="dashboard-card">
            <h2>المستخدمون المسجلون</h2>
            <p>1,248</p>
          </article>
  
          <article className="dashboard-card">
            <h2>بانتظار الاعتماد</h2>
            <p>12</p>
          </article>
  
          <article className="dashboard-card">
            <h2>المشاريع الجارية</h2>
            <p>38</p>
          </article>
  
          <article className="dashboard-card">
            <h2>التسليمات</h2>
            <p>16</p>
          </article>
  
          <article className="dashboard-card">
            <h2>المعاملات</h2>
            <p>74,200 ر.س</p>
          </article>
  
        </div>
      </section>
    );
  }
  
  export default AdminDashboard;