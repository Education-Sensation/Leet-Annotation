import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

const App = () => {
  const [readingText, setReadingText] = useState([]);

  useEffect(() => {
    getText();
  }, []);

  const getText = async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
    );
    const data = await response.json();
    setReadingText(data);
  };

  const firstRendered = readingText.map((item, index) => {
    return <div key={index}>{item}</div>;
  });

  console.log(readingText);

  return (
    <div className="App">
      <div className="readingText">{firstRendered}</div>
      <NoteDisplayUI />
      <AddReadingTextForm readingText={readingText} onSubmit={setReadingText} />
      <AddNoteForm />
    </div>
  );
};

export default App;
