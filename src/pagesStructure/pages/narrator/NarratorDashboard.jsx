import { Link } from "react-router-dom";
import { useNarrator } from "../../context/NarratorContext";
import PageHeader from "../../components/PageHeader";

function NarratorDashboard() {
  const { state } = useNarrator();
  const firstName = state.profile.name.split(" ")[0];

  return (
    <PageHeader
      eyebrow="لوحة التحكم"
      title={`مرحباً، ${firstName}`}
      subtitle="استمر في بناء مكتبتك الصوتية ومتابعة أعمالك."
    >
      <Link className="button button-dark" to="/narrator/projects">
        اكتشف المشاريع
      </Link>
    </PageHeader>
  );
}

export default NarratorDashboard;