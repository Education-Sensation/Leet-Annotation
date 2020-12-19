import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

class App extends React.Component {
  constructor() {
    super();
    this.state = {readingText: this.getText()};  // readingText is an array of strings each representing paragraphs
 }

  setReadingText(newText) {
    this.setState({readingText: newText});
  }

  getText = async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
    );
    const data = await response.json();  // TODO: please turn the data varaible into an array. render() expects this.state.readingText to be an array
    this.setReadingText(data);
  };

  render() {
    const paragraphs = ['graph1', 'graph2', 'graph3'].map((item) => <p>{item}</p>);
    // const paragraphs = this.state.readingText.map((item, index) => {
    //   return <p key={index}>{item}</p>;
    // });
    
    return (
      <div className="App">
        <div className="readingText">{paragraphs}</div>
        <NoteDisplayUI />
        <AddReadingTextForm onSubmit={this.setReadingText} />
        <AddNoteForm />
      </div>
    );  
  }
};

export default App;
