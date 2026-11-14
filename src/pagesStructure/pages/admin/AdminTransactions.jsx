const transactions = [
    {
      id: 1,
      transactionId: "RW-0842",
      project: "رحلة إلى الأندلس",
      parties: "سارة ← عمر",
      amount: "7,475 ر.س",
    },
    {
      id: 2,
      transactionId: "RW-0838",
      project: "مدن لا تنام",
      parties: "ماجد ← خالد",
      amount: "4,600 ر.س",
    },
    {
      id: 3,
      transactionId: "RW-0831",
      project: "مرافئ بعيدة",
      parties: "هند ← ليان",
      amount: "6,900 ر.س",
    },
  ];
  
  function AdminTransactions() {
    return (
      <section className="page-section">
        <h1>المعاملات والمدفوعات</h1>
  
        <input
          className="books-search"
          type="search"
          placeholder="بحث في السجلات..."
        />
  
        <select defaultValue="الكل">
          <option value="الكل">كل الحالات</option>
          <option value="نشط">نشط</option>
          <option value="مكتمل">مكتمل</option>
        </select>
  
        <button className="button" type="button">
          تصفية
        </button>
  
        <div className="books-table-wrap">
          <table className="books-table">
            <thead>
              <tr>
                <th>رقم العملية</th>
                <th>المشروع</th>
                <th>الأطراف</th>
                <th>المبلغ</th>
                <th>الإجراء</th>
              </tr>
            </thead>
  
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.project}</td>
                  <td>{transaction.parties}</td>
                  <td>{transaction.amount}</td>
  
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
  export default AdminTransactions;