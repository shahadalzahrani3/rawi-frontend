const [book, setBook] = useState({
  title: "",
  category: "",
  description: ""
});
<form>

<input
 placeholder="اسم الكتاب"
/>

<select>
  <option>رواية</option>
  <option>قصة قصيرة</option>
  <option>سيرة ذاتية</option>
</select>

<textarea
 placeholder="وصف الكتاب"
/>

<button>
  رفع المشروع
</button>

</form>
const handleSubmit = (e) => {
  e.preventDefault();

  alert("Book uploaded successfully");
};