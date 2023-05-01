import React, { useEffect, useRef } from "react";
import audioFile from "./audio.mp3";
import transcriptAudio from "./transcript.json";
import "./App.css";

const App = () => {
  const playerRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    var a;
    const onTimeUpdate = () => {
      const activeWordIndex = transcriptAudio.findIndex((word) => {
        return word.start >= playerRef.current.currentTime;
      });

      const currentWordElement =
        wordsRef.current.childNodes[activeWordIndex - 1];
      const previousWordElement = wordsRef.current.childNodes[a - 1];

      try {
        currentWordElement.classList.add("active-word");
      } catch (error) {
        console.log(error);
      }

      try {
        previousWordElement.classList.remove("active-word");
      } catch (error) {
        console.log(error);
      }
      a = activeWordIndex;
    };

    playerRef.current.addEventListener("timeupdate", onTimeUpdate);

    const removeRef = () =>
      playerRef.current.removeEventListener("timeupdate", onTimeUpdate);

    return () => removeRef();
  }, []);

  return (
    <div class="flex">
      <div class="container">
        <div ref={wordsRef}>
          {transcriptAudio.map((word, i) => (
            <span key={i}>{word.word + " "}</span>
          ))}
        </div>
        <audio controls src={audioFile} ref={playerRef} />
      </div>
    </div>
  );
};

export default App;
