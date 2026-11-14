
import { Link } from "react-router-dom";

const stages = [
  {
    number: "01",
    title: "انشر مشروعك",
    detail: "أضف تفاصيل كتابك ومتطلبات الأداء الصوتي ليطلع عليها الرواة."
  },
  {
    number: "02",
    title: "اختر الصوت المناسب",
    detail: "استمع إلى تجارب الأداء وقارن بين الرواة قبل الاختيار."
  },
  {
    number: "03",
    title: "استلم كتابك الصوتي",
    detail: "تابع التنفيذ وراجع التسجيلات وأكمل التسليم والدفع."
  }
];

function Home() {
  return (
    <main className="home-page" dir="rtl">

      {/* Hero Section */}
      <section className="landing-hero">

        <div className="hero-copy">
          <span className="eyebrow">
            من الكلمة المكتوبة إلى صوت يُسمع
          </span>

          <h1>
            نصنع للكتاب العربي
            <br />
            صوتاً يليق به
          </h1>

          <p>
            منصة تجمع المؤلفين العرب برواة محترفين لإنتاج كتب
            صوتية عالية الجودة، من تجربة الأداء حتى التسليم والدفع.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="button button-dark">
              ابدأ كمؤلف
            </Link>

            <Link
              to="/register?role=narrator"
              className="button button-outline"
            >
              انضم كراوٍ
            </Link>
          </div>

          <div className="hero-benefits">
            <span>✓ ملفات محمية</span>
            <span>✓ دفع آمن</span>
            <span>✓ رواة محترفون</span>
          </div>
        </div>

        {/* Book Preview */}
        <div className="book-showcase">
          <div className="book-paper">

            <span className="eyebrow">
              كتاب قيد الإنتاج
            </span>

            <h2>رحلة إلى الأندلس</h2>

            <span className="status-chip">
              قيد التنفيذ
            </span>

            {/* Decorative Audio Wave */}
            <div className="soundwave" aria-hidden="true">
              {Array.from({ length: 32 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: `${16 + ((i * 17) % 58)}px`
                  }}
                />
              ))}
            </div>

            <div className="book-footer">
              <span>سارة العتيبي · المؤلفة</span>
              <span>←</span>
              <span>عمر الحربي · الراوي</span>
            </div>

          </div>
        </div>

      </section>

      {/* How Rawi Works */}
      <section className="how-section" id="how-it-works">

        <span className="eyebrow">
          كيف تعمل المنصة؟
        </span>

        <h2>
          ثلاث خطوات من المخطوط إلى الكتاب الصوتي
        </h2>

        <div className="step-grid">
          {stages.map((stage) => (
            <article className="step-card" key={stage.number}>

              <span>{stage.number}</span>

              <h3>{stage.title}</h3>

              <p>{stage.detail}</p>

            </article>
          ))}
        </div>

      </section>

    </main>
  );
}

export default Home;
