import { useEffect, useRef, useState } from "react";

const MIN_SECONDS = 10;
const MAX_SECONDS = 300;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function VoiceRecorder({ onRecorded }) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const supported =
    Boolean(navigator.mediaDevices?.getUserMedia) && typeof window.MediaRecorder !== "undefined";

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const stop = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setRecording(false);
  };

  const start = async () => {
    setError("");
    setPreviewUrl("");
    onRecorded(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());

        if (secondsRef.current < MIN_SECONDS) {
          setError(`التسجيل قصير جداً. الحد الأدنى ${MIN_SECONDS} ثوانٍ.`);
          return;
        }

        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        const extension = recorder.mimeType.includes("mp4") ? "m4a" : "webm";
        const file = new File([blob], `audition-recording.${extension}`, { type: blob.type });
        setPreviewUrl(URL.createObjectURL(blob));
        onRecorded(file);
      };

      recorderRef.current = recorder;
      recorder.start();
      secondsRef.current = 0;
      setSeconds(0);
      setRecording(true);

      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
        if (secondsRef.current >= MAX_SECONDS) stop();
      }, 1000);
    } catch {
      setError("تعذر الوصول إلى الميكروفون. تحقق من صلاحيات المتصفح.");
    }
  };

  if (!supported) {
    return <p className="nr-muted">متصفحك لا يدعم التسجيل المباشر. يمكنك رفع ملف بدلاً من ذلك.</p>;
  }

  return (
    <div className="nr-recorder">
      <div className="nr-actions">
        {recording ? (
          <button type="button" className="button button-dark nr-rec-stop" onClick={stop}>
            ■ إيقاف
          </button>
        ) : (
          <button type="button" className="button button-dark" onClick={start}>
            ● {previewUrl ? "إعادة التسجيل" : "بدء التسجيل"}
          </button>
        )}
        <span className={`nr-timer ${recording ? "is-live" : ""}`} dir="ltr">
          {formatTime(seconds)} / {formatTime(MAX_SECONDS)}
        </span>
      </div>

      {error && <p className="nr-field-error" role="alert">{error}</p>}
      {previewUrl && <audio controls src={previewUrl} />}
    </div>
  );
}

export default VoiceRecorder;