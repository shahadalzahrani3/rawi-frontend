import { useState } from "react";

function AdminProfile() {
  const [name, setName] = useState("نورة السالم");
  const [email, setEmail] = useState("user@rawi.sa");
  const [phone, setPhone] = useState("+966 55 123 4567");
  const [city, setCity] = useState("الرياض");
  const [bio, setBio] = useState(
    "مسؤولة عن إدارة ومتابعة منصة راوي."
  );

  function saveProfile() {
    alert("تم حفظ التغييرات");
  }

  return (
    <section className="page-section">
      <h1>الملف الشخصي</h1>

      <div className="admin-profile-layout">

        <article className="admin-profile-card">
          <div className="profile-avatar">ن</div>

          <h2>{name}</h2>
          <p>مسؤول</p>

          <button className="button button-secondary" type="button">
            تغيير الصورة
          </button>
        </article>

        <div className="admin-profile-form">

          <label>الاسم الكامل</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label>البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>رقم الجوال</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />

          <label>المدينة</label>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          <label>نبذة تعريفية</label>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />

          <button
            className="button"
            type="button"
            onClick={saveProfile}
          >
            حفظ التغييرات
          </button>

        </div>
      </div>
    </section>
  );
}
export default AdminProfile;