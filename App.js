import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const songs = [
    {
      title: "Indo Korean Jukebox",
      src: "/assets/indokoreanjukebox.mp3",
      albumArt: "/assets/indokorean.jpg",
    },
    {
      title: "Rhythm 2",
      src: "/assets/rhythm-2.mp3",
      albumArt: "/assets/folio 2.jpg",
    },
    {
      title: "Rhythm 3",
      src: "/assets/rhythm-3.mp3",
      albumArt: "/assets/folio 3.jpg",
    },
    {
      title: "Rhythm 4",
      src: "/assets/rhythm-4.mp3",
      albumArt: "/assets/folio 4.jpg",
    },
    {
      title: "Rhythm 5",
      src: "/assets/rhythm-5.mp3",
      albumArt: "/assets/musicsymbol.png",
    },
    {
      title: "Rhythm 6",
      src: "/assets/rhythm-6.mp3",
      albumArt: "/assets/folio 6.jpg",
    },
    {
      title: "Rhythm 7",
      src: "/assets/rhythm-7.mp3",
      albumArt: "/assets/folio 7.jpg",
    },
    {
      title: "Rhythm 8",
      src: "/assets/rhythm-8.mp3",
      albumArt: "/assets/folio 8.jpg",
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const toggleLike = () => {
    setLikedSongs((prev) => ({
      ...prev,
      [currentSongIndex]: !prev[currentSongIndex],
    }));
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('/assets/playerbackground.jpg')`,
      }}
    >
      <div className="player-container">
        <img src="/assets/mplayerlogo.jpg" alt="logo" className="logo" />

        <div className="album-art">
          <img
            src={songs[currentSongIndex].albumArt}
            alt="Album Art"
            className="album-img"
          />
        </div>

        <h2 className="song-title">{songs[currentSongIndex].title}</h2>

        <audio
          ref={audioRef}
          src={songs[currentSongIndex].src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleNext}
        ></audio>

        <div className="controls">
          <button onClick={handlePrev}>⏮</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={handleNext}>⏭</button>
        </div>

        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="volume-container">
          <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
            {volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>

        <div className="like-container">
          <button onClick={toggleLike}>
            {likedSongs[currentSongIndex] ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
