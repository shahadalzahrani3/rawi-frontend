import { useRef, useState } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function AudioPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(NaN);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = (Number(event.target.value) / 100) * duration;
  };

  const percent = Number.isFinite(duration) && duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className={`nr-player ${src ? "" : "is-disabled"}`}>
      <button
        type="button"
        className="nr-play"
        onClick={togglePlay}
        disabled={!src}
        aria-label={playing ? `إيقاف ${title}` : `تشغيل ${title}`}
      >
        {playing ? "❚❚" : "►"}
      </button>

      <div className="nr-player-body">
        <strong>{title}</strong>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={percent}
          onChange={seek}
          disabled={!src}
          aria-label="موضع التشغيل"
          style={{ "--progress": `${percent}%` }}
        />
      </div>

      <span className="nr-player-time" dir="ltr">
        {src ? formatTime(duration) : "معاينة غير متاحة"}
      </span>

      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
        />
      )}
    </div>
  );
}

export default AudioPlayer;