import React from "react";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

function* infiniteTagIdGenerator() {
  let int = 0;
  yield 't' + toString(int++);
}

async function getText() {
  // returns an array of strings containing meaty lorem ipsum
  const response = await fetch(
    "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
  );
  const data = await response.json();  // TODO 1: needs to return an array of strings. See below TODO
  return data;
};

class App extends React.Component {
  constructor() {
    super();
    // this.state = {readingText: this.getText()};  // TODO 1: readingText is an array of strings each representing paragraphs (currently just a string)
    this.state = {
      readingText: 'initial text - Kevin, wait a bit for your blessed paragraphs. It was easier as a plain string',
      notes: [],
      tags: []
    };

    // generator for unique IDs (tag IDs distinct from other kinds of IDs because of leading 't')
    this.tagIdGenerator = infiniteTagIdGenerator();

    this.setReadingText = this.setReadingText.bind(this);
    this.appendNote = this.appendNote.bind(this);
    this.handleNewTagData = this.handleNewTagData.bind(this);
  }

  setReadingText(newText) {
    this.setState({readingText: newText});
  }

  handleNewTagData(newTagList, newNote=null) {
    // append a Tag object to state array for each tag in newTagList. If it's not a new tag, update the existing tag object with the new note
    // it's possible to add a new tag with no note
    newTagList.forEach((tag) => {
      const tagId = this.tagIdGenerator.next();
      
      this.setState((state, props) => {
        // make a new Tag object
        const newTag = {
          text: tag.text,
          note: newNote,
          id: tagId
        };

        // append the new Tag object to state array
        const newTagArray = state.tags.concat([newTag]);
        return {tags: newTagArray};
      });  
    });
  }

  appendNote(newNoteData) {  //TODO: should be called "handle" new note data and call appendNote and appendTag
    // make a new Note object with formData fields as attributes
    const newNote = {
      text: newNoteData.note,
      keyphrase: newNoteData.keyPhrase,
      tags: newNoteData.tags
    };

    console.log('adding note ', newNote, ' to ', this.state.notes);

    // append Note object to state array (uses arrow function version of setState() to access previous state)
    this.setState((state, props) => {
      const newNoteArray = state.notes.concat([newNote]);
      return {notes: newNoteArray};
    });

    // save new tag data in state
    this.handleNewTagData(newNoteData.tags, newNoteData.note);
  }

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
