import React from "react";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";
// Bootstrap modules
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function* infiniteTagIdGenerator() {
  let int = 0;
  while (true) {
    yield "t" + (++int).toString();
  }
}

async function getText() {
  // returns an array of strings containing meaty lorem ipsum
  const response = await fetch(
    "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
  );
  const data = await response.json(); // TODO 1: needs to return an array of strings. See below TODO
  return data;
}

class App extends React.Component {
  constructor() {
    super();
    // this.state = {readingText: this.getText()};  // TODO 1: readingText is an array of strings each representing paragraphs (currently just a string)
    this.setReadingText = this.setReadingText.bind(this);
    this.appendNote = this.appendNote.bind(this);
    this.handleNewTagData = this.handleNewTagData.bind(this);
    this.handleDisplayClick = this.handleDisplayClick.bind(this);

    // generator for unique IDs (tag IDs distinct from other kinds of IDs because of leading 't')
    this.tagIdGenerator = infiniteTagIdGenerator();

    // provide some tags by default
    const defaultTags = ["highlight", "footnote", "inline note", "hover note"];
    let defaultTagObjectArray = new Array(defaultTags.length);
    for (const tagText of defaultTags) {
      let newTag = {
        text: tagText,
        notes: [],
        id: this.tagIdGenerator.next().value,
      };

      defaultTagObjectArray.push(newTag);
    }

    this.state = {
      readingText:
        "initial text - Kevin, wait a bit for your blessed paragraphs. It was easier as a plain string",
      notes: [],
      tags: defaultTagObjectArray,
    };

    console.log("default tags working? ", this.state.tags);
  }

  setReadingText(newText) {
    this.setState({ readingText: newText });
  }

  handleNewTagData(tagText) {
    // append a Tag object to state array for each tag in newTagList. If it's not a new tag, return null
    // it's possible to add a new tag with no note
    console.log("***handleNewTagData called");

    const tagId = this.tagIdGenerator.next().value;

    console.log("    this new tag has ID ", tagId);
    console.log("    this new tag has text ", tagText);

    this.setState((state, props) => {
      // make a new Tag object
      const newTag = {
        text: tagText,
        notes: [],
        id: tagId,
      };

      // append the new Tag object to state array
      console.log("adding tag ", tagText, "with id", tagId, " to app state");
      const newTagArray = state.tags.concat([newTag]);
      console.log("   ...so the updated tag array is ", newTagArray);
      return { tags: newTagArray };
    });
  }

  appendNote(newNoteData) {
    //TODO: should be called "handle" new note data and call appendNote and linkNoteToTag
    // make a new Note object with formData fields as attributes
    const newNote = {
      text: newNoteData.note,
      keyphrase: newNoteData.keyphrase,
      tags: newNoteData.tags,
    };

    console.log("adding note ", newNote, " to ", this.state.notes);

    // append Note object to state array (uses arrow function version of setState() to access previous state)
    this.setState((state, props) => {
      const newNoteArray = state.notes.concat([newNote]);
      return { notes: newNoteArray };
    });
  }

  handleDisplayClick(selectedTags) {
    // TDOO: add "case sensitive" button
    // TODO: short-circuit if no notes for the selected tags

    console.log('handleDisplayClick called! Checking readingText for any keyphrases associated with tags ', selectedTags, '...');
    // if this.state.readingText contains any of the user's note's keyphrases, check formatting associated with that note's tag and apply it

    const readingText = this.state.readingText;  // for convenience
    // keep a list of pointers to track the index of each char of each note's keyphrase (for now, notes only have one keyphrase each)
    let charPointers = new Array(this.state.notes.length).fill(0);
    let matches = 0;

    // for each paragraph, (TODO: currently a string)
    // check each char of the paragraph
    for (let readingCharIndex = 0; readingCharIndex < readingText.length; readingCharIndex++) {  // readingCharIndex used to insert formatting at correct place
      const readingChar = readingText[readingCharIndex];
      console.log('checking ', readingChar);

      // check all the notes
      for (let noteIndex = 0; noteIndex < this.state.notes.length; noteIndex++) {
        const note = this.state.notes[noteIndex];
        const keyphrase = note.keyphrase;
        const checkCharPointer = charPointers[noteIndex];

        // if the readingText char is the same as the index char of any user keyphrases
        if (keyphrase[checkCharPointer] === readingChar) {
          // check if it's the last char of the keyphrase (then apply formatting), else advance the char index pointer for those keyphrases
          if (checkCharPointer === keyphrase.length - 1) {  // string.length is 1-indexed while checkCharPointer is 0-indexed
            // use readingCharIndex to insert formatting in right place
            console.log('readingText contains keyphrase ', keyphrase, ' at index ', readingCharIndex, ' apply formatting here');
            matches++;
          } else {
            console.log('advancing pointer for ', keyphrase, ' since it contains ', readingChar);
            charPointers[noteIndex]++;
          }
        } else {
          // reset pointer
          console.log('resetting pointer for ', keyphrase, ' since it contained all the chars until this point but not ', readingChar);
          charPointers[noteIndex] = 0;
        }
      }
    }
    // report number of keyphrases found in readingText
    if (matches > 0) {
      const notice = 'found ' + matches + ' keyphrases in your reading text and made the annotations specified by their tags';
      alert(notice);
    } else {
      alert('none of your keyphrases appear in this text');
    }
  }

  render() {
    const paragraphs = <p>{this.state.readingText}</p>; // TODO 1: once this.state.readingText is an array of strings, uncomment the below code to replace this temp line
    // const paragraphs = this.state.readingText.map((item, index) => {
    //   return <p key={index}>{item}</p>;
    // });

    return (
      <div className="App">
        <div className="inner">
          {/* -- NavBar component -- */}
          <Navbar
            className="navbar1"
            collapseOnSelect
            expand="lg"
            bg="light"
            variant="light"
          >
            <Navbar.Brand href="#home">Leet Annotation</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Nav className="navitem">Team Education Sensation</Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* -- Jumbotron - Header Code --  */}
          <Jumbotron className="jumbo">
            <h1>Welcome to Leet Annotation!</h1>
            <h5 className="jumbo-text">
              A new interactive annotating web app for students of all ages.
              <br />
              Ever have to painstakingly annotate an article, textbook, or
              novel? Well this is the tool for you! Annotate and create
              user-specific notes which can be viewed inline or as a popup.
              <br />
            </h5>
          </Jumbotron>

          <div className="subcontainer">
            {/* -- Text Container -- */}
            <div className="readingText">{paragraphs}</div>

            <AddReadingTextForm submitNewReadingText={this.setReadingText} />
          </div>
          {/* -- Footer, show New Note, Show and Hide Notes, etc. -- */}
          <div className="fixed-bottom position-sticky">
            <Accordion className="accordian-contents">
              <Card className="card">
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <Button variant="dark">
                      Click me to Show/Hide Notes for a tag or add a New Note!
                    </Button>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <NoteDisplayUI tagList={this.state.tags} onDisplayClick={this.handleDisplayClick} />
                    <AddNoteForm
                      userTags={this.state.tags}  // TODO: remove this?
                      tagList={this.state.tags}
                      submitNewNote={this.appendNote}
                      submitNewTag={this.handleNewTagData}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
