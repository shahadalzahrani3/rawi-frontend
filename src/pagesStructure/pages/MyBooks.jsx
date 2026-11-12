import books from "../data/books";

<table>

<thead>
<tr>
  <th>اسم الكتاب</th>
  <th>التصنيف</th>
  <th>الحالة</th>
  <th>آخر تحديث</th>
</tr>
</thead>

<tbody>

{books.map(book => (
<tr key={book.id}>
  <td>{book.title}</td>
  <td>{book.category}</td>
  <td>{book.status}</td>
  <td>{book.updated}</td>
</tr>
))}

</tbody>
</table>

const [search, setSearch] = useState("");
books.filter(book =>
 book.title.includes(search)
)