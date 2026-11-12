import { useState } from "react";
import initialNarrators from "../data/narrators";

function Auditions() {
  const [applications, setApplications] = useState(initialNarrators);

  const acceptAudition = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Accepted" } : app
      )
    );
  };

  const rejectAudition = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
  };

  return (
    <div>
      <h2>التقديمات</h2>

      {applications.map((narrator) => (
        <div key={narrator.id}>
          <h3>{narrator.name}</h3>
          <p>{narrator.language}</p>
          <p>{narrator.experience} سنوات</p>
          <p>الحالة: {narrator.status}</p>

          <button type="button" onClick={() => acceptAudition(narrator.id)}>
            قبول
          </button>

          <button type="button" onClick={() => rejectAudition(narrator.id)}>
            رفض
          </button>
        </div>
      ))}
    </div>
      );
}

export default Auditions;
