import { useState } from "react";

function UploadBooks() {
  const [book, setBook] = useState({
    title: "",
    category: "رواية",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("Book uploaded successfully");
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h1>إضافة كتاب</h1>
      <input
        value={book.title}
        onChange={(event) =>
          setBook((previous) => ({ ...previous, title: event.target.value }))
        }
        placeholder="اسم الكتاب"
        required
      />

      <select
        value={book.category}
        onChange={(event) =>
          setBook((previous) => ({ ...previous, category: event.target.value }))
        }
      >
        <option>رواية</option>
        <option>قصة قصيرة</option>
        <option>سيرة ذاتية</option>
      </select>

      <textarea
        value={book.description}
        onChange={(event) =>
          setBook((previous) => ({
            ...previous,
            description: event.target.value,
          }))
        }
        placeholder="وصف الكتاب"
      />

      <button className="button" type="submit">رفع المشروع</button>
    </form>
  );
}

export default UploadBooks;
