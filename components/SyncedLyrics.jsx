import React, { useEffect, useState, useRef } from "react";

function parseSyncedLyrics(syncedLyrics) {
  const lines = syncedLyrics.split("\n").filter(Boolean);
  return lines
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+)\.(\d+)\]\s*(.*)/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const hundredths = parseInt(match[3], 10);
        const text = match[4];
        return { time: minutes * 60 + seconds + hundredths / 100, text };
      }
      return null;
    })
    .filter(Boolean);
}

export default function SyncedLyrics({ lyrics }) {
  const parsedLyrics = useRef(parseSyncedLyrics(lyrics));
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lineRefs = useRef([]); // refs for each line

  // simulate playback (replace with real audio time later)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((t) => t + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // update current line index
  useEffect(() => {
    const index = parsedLyrics.current.findIndex(
      (line, i) =>
        currentTime >= line.time &&
        (i === parsedLyrics.current.length - 1 || currentTime < parsedLyrics.current[i + 1].time)
    );
    if (index !== -1) setCurrentIndex(index);
  }, [currentTime]);

  // auto-scroll current line into view
  useEffect(() => {
    if (lineRefs.current[currentIndex]) {
      lineRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  return (
    <div className="drag-area min-h-[200px] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700/50 bg-black/30 p-6 shadow-2xl backdrop-blur-xl">
      {parsedLyrics.current.map((line, idx) => (
        <p
          onClick={() => setCurrentTime(line.time)}
          key={idx}
          ref={(el) => (lineRefs.current[idx] = el)}
          className={`leading-relaxed whitespace-pre-wrap transition-colors hover:cursor-pointer ${
            idx === currentIndex
              ? "text-white font-bold text-2xl italic"
              : "text-gray-400 text-xl"
          }`}
        >
          {line.text || <>&nbsp;</>}
        </p>
      ))}
    </div>
  );
}
