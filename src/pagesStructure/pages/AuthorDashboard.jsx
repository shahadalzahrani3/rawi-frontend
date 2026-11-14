function AuthorDashboard() {
  return (
    <section className="page-section">
      <h1>لوحة التحكم</h1>
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h2>مشاريع نشطة</h2>
          <p>3</p>
        </article>

        <article className="dashboard-card">
          <h2>بانتظار الموافقة</h2>
          <p>2</p>
        </article>

        <article className="dashboard-card">
          <h2>تجارب أداء</h2>
          <p>7</p>
        </article>

        <article className="dashboard-card">
          <h2>مشاريع مكتملة</h2>
          <p>4</p>
        </article>
      </div>
    </section>
  );
}

export default AuthorDashboard;
