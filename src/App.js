import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

class App extends React.Component {
  constructor() {
    super();
    // this.state = {readingText: this.getText()};  // TODO 1: readingText is an array of strings each representing paragraphs (currently just a string)
    this.state = {
      readingText: 'initial text - Kevin, wait a bit for your blessed paragraphs. It was easier as a plain string',
      notes: []
    };
    this.setReadingText = this.setReadingText.bind(this);
    this.appendNote = this.appendNote.bind(this);
  }

  setReadingText(newText) {
    this.setState({readingText: newText});
  }

  appendNote(newNoteData) {
    // make a new Note object with formData fields as attributes
    const newNote = {
      text: newNoteData.note,
      keyphrase: newNoteData.keyPhrase,
      tags: newNoteData.tags
    };

    console.log('adding note ', newNote, ' to ', this.state.notes);

    // this.setState({notes: newNote});  // works but isn't our desired feature

    // uses arrow function version of setState() to access previous state
    this.setState((state, props) => {notes: state.notes.push(newNote)});  // TODO: this line will append note rather than replace
  }

  getText = async () => {
    // returns an array of strings containing meaty lorem ipsum
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
    );
    const data = await response.json();  // TODO 1: needs to return an array of strings. See below TODO
    return data;
  };

  render() {
    const paragraphs = <p>{this.state.readingText}</p>;  // TODO 1: once this.state.readingText is an array of strings, uncomment the below code to replace this temp line
    // const paragraphs = this.state.readingText.map((item, index) => {
    //   return <p key={index}>{item}</p>;
    // });
    
    return (
      <div className="App">
        <div className="readingText">{paragraphs}</div>
        <NoteDisplayUI />
        <AddNoteForm submitNewNote={this.appendNote} />
        <AddReadingTextForm submitNewReadingText={this.setReadingText} />
      </div>
    );  
  }
};

export default App;
