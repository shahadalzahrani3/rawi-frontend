import { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "رحلة إلى الأندلس",
    author: "سارة العتيبي",
    approval: "معتمد",
    visibility: "ظاهر",
  },
  {
    id: 2,
    title: "ظلال النخيل",
    author: "هند القحطاني",
    approval: "معتمد",
    visibility: "مخفي",
  },
  {
    id: 3,
    title: "مرافئ بعيدة",
    author: "ماجد سالم",
    approval: "معتمد",
    visibility: "ظاهر",
  },
];

function AdminBookVisibility() {
  const [books, setBooks] = useState(initialBooks);

  function toggleVisibility(id) {
    setBooks(
      books.map((book) =>
        book.id === id
          ? {
              ...book,
              visibility:
                book.visibility === "ظاهر" ? "مخفي" : "ظاهر",
            }
          : book
      )
    );
  }

  return (
    <section className="page-section">
      <h1>ظهور إعلانات الكتب</h1>

      <input
        className="books-search"
        type="search"
        placeholder="بحث في السجلات..."
      />

      <select defaultValue="الكل">
        <option value="الكل">كل الحالات</option>
        <option value="ظاهر">ظاهر</option>
        <option value="مخفي">مخفي</option>
      </select>

      <button className="button" type="button">
        تصفية
      </button>

      <div className="books-table-wrap">
        <table className="books-table">
          <thead>
            <tr>
              <th>الكتاب</th>
              <th>المؤلف</th>
              <th>حالة الاعتماد</th>
              <th>الظهور</th>
              <th>الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.approval}</td>
                <td>{book.visibility}</td>

                <td>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => toggleVisibility(book.id)}
                  >
                    {book.visibility === "ظاهر"
                      ? "إخفاء الإعلان"
                      : "إظهار الإعلان"}
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
export default AdminBookVisibility;