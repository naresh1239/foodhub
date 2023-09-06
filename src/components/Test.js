import React, { useState, useEffect } from 'react';

function Test() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = new window.SpeechRecognition();

  useEffect(() => {
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  }, []);

  const startRecording = () => {
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognition.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Audio to Text Conversion</h2>
      <p>Click "Start Recording" to begin audio transcription.</p>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default Test;
