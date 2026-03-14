import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "./playerStyle.scss";

const formatTime = (seconds) => {
  if (Number.isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    audio.src = song.url;
    audio.load();
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [song.url, playbackRate]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to play audio", error);
    }
  };

  const seek = (newTime) => {
    const audio = audioRef.current;
    if (!audio || Number.isNaN(newTime)) return;
    const clamped = Math.max(0, Math.min(duration, newTime));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const changeRate = (delta) => {
    const nextRate = Math.max(0.5, Math.min(2, playbackRate + delta));
    setPlaybackRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  };

  return (
    <section className="player-page">
      <div className="player-card">
        <div className="song-info">
          <img
            src={song.posterUrl}
            alt={song.title}
            className="song-art"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
          <div>
            <h2>{song.title || "Unknown Track"}</h2>
            <p>Mood: <strong>{song.mood || "Unknown"}</strong></p>
            <p className="song-url">{song.url || "No source URL"}</p>
          </div>
        </div>

        <audio ref={audioRef} />

        <div className="controls">
          <button type="button" className="smallButton" onClick={() => seek(currentTime - 10)}>
            ⏮️ 10s
          </button>
          <button className="mainButton" onClick={togglePlay}>
            {isPlaying ? "⏸ Pause" : "▶️ Play"}
          </button>
          <button type="button" className="smallButton" onClick={() => seek(currentTime + 10)}>
            10s ⏭️
          </button>
        </div>

        <div className="progress-row">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="speed-controls">
          <button type="button" className="smallButton" onClick={() => changeRate(-0.25)}>-</button>
          <span>Speed: {playbackRate.toFixed(2)}x</span>
          <button type="button" className="smallButton" onClick={() => changeRate(0.25)}>+</button>
        </div>
      </div>
    </section>
  );
};

export default Player;
