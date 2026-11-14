import { useState } from "react";
import { useNarrator } from "../../context/NarratorContext";
import { SAMPLE_MAX_MB } from "../../data/narratorData";
import PageHeader from "../../components/PageHeader";
import AudioPlayer from "../../components/AudioPlayer";
import AudioFileInput from "../../components/AudioFileInput";
import { formatDate, formatSize } from "../../utils/narratorHelpers";
import { getAudioUrl } from "../../utils/useNarratorStore";

const MAX_SAMPLES = 6;

function VoiceSamples() {
  const { state, addSample, removeSample, setPrimarySample } = useNarrator();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const limitReached = state.samples.length >= MAX_SAMPLES;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (limitReached) {
      setError(`الحد الأقصى ${MAX_SAMPLES} عينات. احذف عينة أولاً.`);
      return;
    }
    if (title.trim().length < 3) {
      setError("أدخل عنواناً للعينة (3 أحرف على الأقل).");
      return;
    }
    if (files.length === 0) {
      setError("اختر ملفاً صوتياً صالحاً.");
      return;
    }

    addSample(title.trim(), files[0]);
    setTitle("");
    setFiles([]);
    setError("");
    setShowForm(false);
    setMessage("تم رفع العينة الصوتية بنجاح.");
  };

  return (
    <>
      <PageHeader eyebrow="ملف الراوي" title="عينات الصوت">
        <button
          type="button"
          className="button button-dark"
          onClick={() => {
            setShowForm(!showForm);
            setMessage("");
          }}
          aria-expanded={showForm}
        >
          {showForm ? "إلغاء" : "رفع عينة صوتية"}
        </button>
      </PageHeader>

      {message && <p className="form-success nr-page-alert" role="status">{message}</p>}

      {showForm && (
        <form className="nr-card nr-form nr-upload-card" onSubmit={handleSubmit} noValidate>
          <h2>رفع عينة جديدة</h2>
          <label>
            عنوان العينة
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="مثال: رواية تاريخية · أداء درامي"
            />
          </label>

          <AudioFileInput
            maxMb={SAMPLE_MAX_MB}
            files={files}
            onChange={(next) => {
              setFiles(next);
              setError("");
            }}
          />

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="nr-actions">
            <button className="button button-dark" type="submit" disabled={limitReached}>
              رفع العينة
            </button>
            <small className="nr-muted">
              {state.samples.length} من {MAX_SAMPLES} عينات
            </small>
          </div>
        </form>
      )}

      {state.samples.length === 0 ? (
        <div className="nr-card nr-empty-card">
          <p className="nr-empty">لم ترفع أي عينة بعد. العينات تساعد المؤلفين على اختيارك.</p>
        </div>
      ) : (
        <ul className="nr-list">
          {state.samples.map((sample) => (
            <li key={sample.id} className="nr-card nr-sample">
              <div className="nr-sample-info">
                <span className={`nr-badge ${sample.primary ? "nr-badge-info" : "nr-badge-muted"}`}>
                  {sample.primary ? "رئيسية" : "عامة"}
                </span>
                <h3>{sample.title}</h3>
                <p className="nr-muted">
                  {sample.fileName.split(".").pop().toUpperCase()} · {formatSize(sample.size)} · رُفعت في {formatDate(sample.uploadedAt)}
                </p>
              </div>

              <AudioPlayer src={getAudioUrl(sample.id)} title={sample.title} />

              <div className="nr-sample-actions">
                {confirmId === sample.id ? (
                  <>
                    <span>حذف العينة؟</span>
                    <button
                      type="button"
                      className="nr-text-button nr-danger"
                      onClick={() => {
                        removeSample(sample.id);
                        setConfirmId(null);
                      }}
                    >
                      نعم
                    </button>
                    <button type="button" className="nr-text-button" onClick={() => setConfirmId(null)}>
                      لا
                    </button>
                  </>
                ) : (
                  <>
                    {!sample.primary && (
                      <button type="button" className="nr-text-button" onClick={() => setPrimarySample(sample.id)}>
                        تعيين كرئيسية
                      </button>
                    )}
                    <button type="button" className="nr-text-button" onClick={() => setConfirmId(sample.id)}>
                      حذف
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default VoiceSamples;