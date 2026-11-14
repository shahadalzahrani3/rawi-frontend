import { useState } from "react";
import initialUsers from "../../data/users";

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);

  function toggleStatus(id) {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "نشط" ? "معلق" : "نشط",
            }
          : user
      )
    );
  }
  return (
    <section className="page-section">
      <h1>حسابات المستخدمين</h1>
      <input
        className="books-search"
        type="search"
        placeholder="ابحث عن مستخدم بالاسم..."
      />

      <select defaultValue="الكل">
        <option value="الكل">كل الحالات</option>
        <option value="نشط">نشط</option>
        <option value="معلق">معلق</option>
      </select>

      <button className="button" type="button">
        تصفية
      </button>
      <div className="books-table-wrap">
        <table className="books-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الدور</th>
              <th>البريد</th>
              <th>الحالة</th>
              <th>الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.status === "نشط"
                      ? "تعليق الحساب"
                      : "تفعيل الحساب"}
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

export default AdminUsers;