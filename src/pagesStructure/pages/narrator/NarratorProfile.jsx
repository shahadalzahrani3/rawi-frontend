import { useState } from "react";
import { useNarrator } from "../../context/NarratorContext";
import { DIALECTS, VOICE_STYLES } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";

const PHOTO_MAX_MB = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s]{9,15}$/;

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 3) errors.name = "أدخل الاسم الكامل (3 أحرف على الأقل).";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "أدخل بريداً إلكترونياً صحيحاً.";
  if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) errors.phone = "رقم الجوال غير صحيح.";
  if (form.bio.trim().length < 20) errors.bio = "النبذة يجب أن تكون 20 حرفاً على الأقل.";
  if (form.dialects.length === 0) errors.dialects = "اختر لهجة واحدة على الأقل.";
  if (form.voiceStyles.length === 0) errors.voiceStyles = "اختر أسلوباً صوتياً واحداً على الأقل.";
  if (!form.gender) errors.gender = "اختر الجنس.";

  const years = Number(form.experience);
  if (form.experience === "" || !Number.isInteger(years) || years < 0 || years > 60) {
    errors.experience = "أدخل سنوات خبرة بين 0 و 60.";
  }

  return errors;
}

function NarratorProfile() {
  const { state, saveProfile } = useNarrator();
  const [form, setForm] = useState(state.profile);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setMessage("");
  };

  const toggle = (field, value) => {
    const list = form[field];
    update(field, list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handlePhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, photo: "الصورة يجب أن تكون JPG أو PNG." }));
      return;
    }
    if (file.size > PHOTO_MAX_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: "حجم الصورة أكبر من 5MB." }));
      return;
    }

    const img = new Image();
    img.onload = () => {
      const size = 160;
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      canvas.getContext("2d").drawImage(
        img,
        (img.width - side) / 2,
        (img.height - side) / 2,
        side,
        side,
        0,
        0,
        size,
        size
      );
      update("photo", canvas.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setMessage("");
      return;
    }

    saveProfile({ ...form, name: form.name.trim(), email: form.email.trim(), bio: form.bio.trim() });
    setMessage("تم حفظ الملف الشخصي بنجاح.");
  };

  const errorText = (field) =>
    errors[field] && <span className="nr-field-error">{errors[field]}</span>;

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <>
      <PageHeader eyebrow="حساب راوٍ" title="الملف الشخصي">
        <button className="button button-dark" type="submit" form="profile-form">
          حفظ التغييرات
        </button>
      </PageHeader>

      {hasErrors && <p className="form-error nr-page-alert" role="alert">يرجى تصحيح الحقول المحددة قبل الحفظ.</p>}
      {message && <p className="form-success nr-page-alert" role="status">{message}</p>}

      <div className="nr-profile-grid">
        <aside className="nr-card nr-avatar-card">
          <div className="nr-avatar-lg" aria-hidden="true">
            {form.photo ? <img src={form.photo} alt="" /> : form.name.trim().charAt(0)}
          </div>
          <strong>{form.name || "—"}</strong>
          <span className="nr-muted">راوٍ</span>
          <label className="button button-outline nr-file-button">
            تغيير الصورة
            <input type="file" accept="image/png,image/jpeg" onChange={handlePhoto} />
          </label>
          <small className="nr-muted">JPG أو PNG · بحد أقصى 5MB</small>
          {errorText("photo")}
        </aside>

        <form id="profile-form" className="nr-card nr-form" onSubmit={handleSubmit} noValidate>
          <div className="nr-form-row">
            <label>
              الاسم الكامل *
              <input value={form.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} />
              {errorText("name")}
            </label>
            <label>
              البريد الإلكتروني *
              <input type="email" dir="ltr" value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} />
              {errorText("email")}
            </label>
          </div>

          <div className="nr-form-row">
            <label>
              رقم الجوال
              <input type="tel" dir="ltr" placeholder="+966 55 123 4567" value={form.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} />
              {errorText("phone")}
            </label>
            <label>
              المدينة
              <input value={form.city} onChange={(e) => update("city", e.target.value)} />
            </label>
          </div>

          <label>
            نبذة تعريفية *
            <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="عرّف المؤلفين بخبرتك وأسلوبك..." aria-invalid={Boolean(errors.bio)} />
            <small className="nr-muted">{form.bio.trim().length} / 20 حرفاً كحد أدنى</small>
            {errorText("bio")}
          </label>

          <fieldset className="nr-fieldset">
            <legend>اللهجات *</legend>
            <div className="nr-chips">
              {DIALECTS.map((d) => (
                <label key={d} className={`nr-chip ${form.dialects.includes(d) ? "is-on" : ""}`}>
                  <input type="checkbox" checked={form.dialects.includes(d)} onChange={() => toggle("dialects", d)} />
                  {d}
                </label>
              ))}
            </div>
            {errorText("dialects")}
          </fieldset>

          <fieldset className="nr-fieldset">
            <legend>الأساليب الصوتية *</legend>
            <div className="nr-chips">
              {VOICE_STYLES.map((s) => (
                <label key={s} className={`nr-chip ${form.voiceStyles.includes(s) ? "is-on" : ""}`}>
                  <input type="checkbox" checked={form.voiceStyles.includes(s)} onChange={() => toggle("voiceStyles", s)} />
                  {s}
                </label>
              ))}
            </div>
            {errorText("voiceStyles")}
          </fieldset>

          <div className="nr-form-row">
            <label>
              الجنس *
              <select value={form.gender} onChange={(e) => update("gender", e.target.value)} aria-invalid={Boolean(errors.gender)}>
                <option value="">اختر...</option>
                <option>ذكر</option>
                <option>أنثى</option>
              </select>
              {errorText("gender")}
            </label>
            <label>
              سنوات الخبرة *
              <input type="number" min="0" max="60" value={form.experience} onChange={(e) => update("experience", e.target.value)} aria-invalid={Boolean(errors.experience)} />
              {errorText("experience")}
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default NarratorProfile;