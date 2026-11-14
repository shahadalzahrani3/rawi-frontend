import { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "ظلال النخيل",
    author: "سارة العتيبي",
    submitted: "اليوم 09:40",
    completion: "100%",
    status: "بانتظار المراجعة",
  },
  {
    id: 2,
    title: "مرافئ بعيدة",
    author: "هند القحطاني",
    submitted: "أمس 16:12",
    completion: "100%",
    status: "بانتظار المراجعة",
  },
];

function AdminBooks() {
  const [books, setBooks] = useState(initialBooks);

  function approveBook(id) {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, status: "معتمد" }
          : book
      )
    );
  }

  function rejectBook(id) {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, status: "مرفوض" }
          : book
      )
    );
  }

  return (
    <section className="page-section">
      <h1>اعتماد إعلانات الكتب</h1>

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h2>بانتظار المراجعة</h2>
          <p>12</p>
        </article>

        <article className="dashboard-card">
          <h2>اعتمدت هذا الأسبوع</h2>
          <p>8</p>
        </article>
      </div>

      <div className="books-table-wrap">
        <table className="books-table">
          <thead>
            <tr>
              <th>الكتاب</th>
              <th>المؤلف</th>
              <th>تاريخ الإرسال</th>
              <th>اكتمال البيانات</th>
              <th>الحالة</th>
              <th>الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.submitted}</td>
                <td>{book.completion}</td>
                <td>{book.status}</td>

                <td>
                  <button
                    className="button"
                    type="button"
                    onClick={() => approveBook(book.id)}
                  >
                    اعتماد
                  </button>

                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => rejectBook(book.id)}
                  >
                    رفض
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

export default AdminBooks;