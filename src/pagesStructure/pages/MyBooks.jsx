import { useState } from "react";
import books from "../data/books";

function MyBooks() {
  const [search, setSearch] = useState("");
  const filteredBooks = books.filter((book) =>
    book.title.includes(search)
  );

  return (
    <section className="page-section">
      <h1>مشاريعي</h1>
      <input
        className="books-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="ابحث عن كتاب"
        aria-label="ابحث عن كتاب"
      />

      <div className="books-table-wrap">
        <table className="books-table">
          <thead>
            <tr>
              <th>اسم الكتاب</th>
              <th>التصنيف</th>
              <th>الحالة</th>
              <th>آخر تحديث</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.category}</td>
                <td>{book.status}</td>
                <td>{book.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MyBooks;
