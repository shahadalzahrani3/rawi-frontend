import { useId, useState } from "react";
import { formatSize, validateAudioFile } from "../utils/narratorHelpers";

function AudioFileInput({ maxMb, multiple = false, files, onChange }) {
  const inputId = useId();
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const picked = Array.from(fileList);
    if (picked.length === 0) return;

    for (const file of picked) {
      const problem = validateAudioFile(file, maxMb);
      if (problem) {
        setError(`${file.name}: ${problem}`);
        return;
      }
    }

    setError("");
    onChange(multiple ? [...files, ...picked] : picked.slice(0, 1));
  };

  return (
    <div className="nr-upload">
      <label
        htmlFor={inputId}
        className={`nr-dropzone ${dragging ? "is-dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <strong>اسحب الملف هنا أو اضغط للاختيار</strong>
        <small>MP3 أو WAV · حتى {maxMb}MB{multiple ? " لكل ملف" : ""}</small>
      </label>

      <input
        id={inputId}
        className="nr-hidden-input"
        type="file"
        accept=".mp3,.wav,audio/mpeg,audio/wav"
        multiple={multiple}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && <p className="nr-field-error" role="alert">{error}</p>}

      {files.length > 0 && (
        <ul className="nr-file-list">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              <span dir="ltr">{file.name}</span>
              <small>{formatSize(file.size)}</small>
              <button type="button" onClick={() => onChange(files.filter((_, i) => i !== index))}>
                إزالة
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AudioFileInput;