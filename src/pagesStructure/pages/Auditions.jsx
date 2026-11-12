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
    <section className="page-section">
      <h1>التقديمات</h1>

      <div className="audition-list">
        {applications.map((narrator) => (
          <article className="audition-card" key={narrator.id}>
          <h3>{narrator.name}</h3>
          <p>{narrator.language}</p>
          <p>{narrator.experience} سنوات</p>
          <p>الحالة: {narrator.status}</p>

            <div className="audition-actions">
              <button
                className="button"
                type="button"
                onClick={() => acceptAudition(narrator.id)}
              >
                قبول
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => rejectAudition(narrator.id)}
              >
                رفض
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Auditions;
