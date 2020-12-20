import React from "react";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

function* infiniteTagIdGenerator() {
  let int = 0;
  while (true) {
    yield 't' + (++int).toString();
  }
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

    this.setReadingText = this.setReadingText.bind(this);
    this.appendNote = this.appendNote.bind(this);
    this.handleNewTagData = this.handleNewTagData.bind(this);

    // generator for unique IDs (tag IDs distinct from other kinds of IDs because of leading 't')
    this.tagIdGenerator = infiniteTagIdGenerator();

    // provide some tags by default
    const defaultTags = ['highlight', 'footnote', 'inline note', 'hover note'];
    let defaultTagObjectArray = new Array(defaultTags.length);
    for (const tagText of defaultTags) {
      
      let newTag = {
        text: tagText,
        notes: [],
        id: this.tagIdGenerator.next().value
      };
      
      defaultTagObjectArray.push(newTag);
    }

    this.state = {
      readingText: 'initial text - Kevin, wait a bit for your blessed paragraphs. It was easier as a plain string',
      notes: [],
      tags: defaultTagObjectArray
    };

    console.log('default tags working? ', this.state.tags);
  }

  setReadingText(newText) {
    this.setState({readingText: newText});
  }

  handleNewTagData(tagText) {
    // append a Tag object to state array for each tag in newTagList. If it's not a new tag, return null
    // it's possible to add a new tag with no note
    console.log('***handleNewTagData called');

    const tagId = this.tagIdGenerator.next().value;
    
    console.log('    this new tag has ID ', tagId);
    console.log('    this new tag has text ', tagText);

    this.setState((state, props) => {
      // make a new Tag object
      const newTag = {
        text: tagText,
        notes: [],
        id: tagId
      };

      // append the new Tag object to state array
      console.log('adding tag ', tagText, 'with id', tagId, ' to app state');
      const newTagArray = state.tags.concat([newTag]);
      console.log('   ...so the updated tag array is ', newTagArray);
      return {tags: newTagArray};
    });  
  }

  appendNote(newNoteData) {  //TODO: should be called "handle" new note data and call appendNote and linkNoteToTag
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
        <AddNoteForm userTags={this.state.tags} tagList={this.state.tags} submitNewNote={this.appendNote} submitNewTag={this.handleNewTagData} />
        <AddReadingTextForm submitNewReadingText={this.setReadingText} />
      </div>
    );  
  }
};

export default App;
