import { useState } from "react";

const storageKey = "rawi.authorProfile";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
};

function getSavedProfile() {
  const savedProfile = window.localStorage.getItem(storageKey);

  if (!savedProfile) {
    return emptyProfile;
  }

  try {
    const parsedProfile = JSON.parse(savedProfile);
    return {
      name: typeof parsedProfile.name === "string" ? parsedProfile.name : "",
      email: typeof parsedProfile.email === "string" ? parsedProfile.email : "",
      phone: typeof parsedProfile.phone === "string" ? parsedProfile.phone : "",
    };
  } catch (error) {
    console.error("Could not read the saved author profile.", error);
    return emptyProfile;
  }
}

function Profile() {
  const [profile, setProfile] = useState(getSavedProfile);
  const [message, setMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(profile));
      setMessage("تم حفظ بيانات الملف الشخصي على هذا الجهاز.");
    } catch (error) {
      console.error("Could not save the author profile.", error);
      setMessage("تعذر حفظ الملف الشخصي. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <section className="page-section">
      <h1>الملف الشخصي</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-name">الاسم الكامل</label>
        <input
          autoComplete="name"
          id="profile-name"
          name="name"
          onChange={updateField}
          required
          value={profile.name}
        />

        <label htmlFor="profile-email">البريد الإلكتروني</label>
        <input
          autoComplete="email"
          id="profile-email"
          name="email"
          onChange={updateField}
          required
          type="email"
          value={profile.email}
        />

        <label htmlFor="profile-phone">رقم الهاتف</label>
        <input
          autoComplete="tel"
          id="profile-phone"
          name="phone"
          onChange={updateField}
          type="tel"
          value={profile.phone}
        />

        <button className="button" type="submit">
          حفظ التغييرات
        </button>
        {message && (
          <p aria-live="polite" className="profile-message">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default Profile;
