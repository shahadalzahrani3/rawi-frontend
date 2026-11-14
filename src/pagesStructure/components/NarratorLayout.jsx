import { Link, Outlet } from "react-router-dom";
import NarratorTopbar from "./NarratorTopbar";
import NarratorSidebar from "./NarratorSidebar";
import { NarratorContext } from "../context/NarratorContext";
import { useNarratorStore } from "../utils/useNarratorStore";
import "../pages/narrator/narrator.css";

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem("rawiDemoUser") || "null");
  } catch {
    return null;
  }
}

function NarratorShell({ session }) {
  const store = useNarratorStore(session);
  const name = store.state.profile.name || session.name;

  return (
    <NarratorContext.Provider value={store}>
      <div className="nr-app" dir="rtl">
        <NarratorTopbar
          name={name}
          notificationCount={store.state.notifications.length}
        />

        <div className="nr-body">
          <NarratorSidebar />
          <main className="nr-main">
            <Outlet />
          </main>
        </div>
      </div>
    </NarratorContext.Provider>
  );
}

function NarratorLayout() {
  const session = readSession();

  if (!session || session.role !== "narrator") {
    return (
      <main className="utility-page" dir="rtl">
        <section className="utility-card">
          <h1>يرجى تسجيل الدخول كراوٍ أولاً</h1>
          <Link to="/login" className="button button-dark">
            تسجيل الدخول
          </Link>
        </section>
      </main>
    );
  }

  return <NarratorShell session={session} />;
}

export default NarratorLayout;