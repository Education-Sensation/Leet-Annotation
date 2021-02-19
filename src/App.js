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
    this.formatElement = this.formatElement.bind(this);
    this.getTagIndex = this.getTagIndex.bind(this);

    // generator for unique IDs (tag IDs distinct from other kinds of IDs because of leading 't')
    this.tagIdGenerator = infiniteTagIdGenerator();

    // provide some tags by default
    this.defaultTags = ["highlight", "footnote", "inline note", "hover note"];
    let defaultTagObjectArray = new Array(this.defaultTags.length);
    for (const tagText of this.defaultTags) {
      let newTag = {
        text: tagText,
        notes: [],
        id: this.tagIdGenerator.next().value,
      };

      defaultTagObjectArray.push(newTag);
    }

    this.state = {
      readingText: [
        <p><span>initial text -</span><span> Kevin, wait no more for your blessed paragraphs</span></p>,
        <p>The paragraphs are upon us</p>
      ],
      notes: [],
      tags: defaultTagObjectArray,
    };

    console.log("default tags working? ", this.state.tags);
  }

  getTagIndex(tagName) {
    /*
    returns the index of the tag in this.state.tags whose tag text matches the given string
    tagName: string naming the tag to get
    return: int index
    */
    let index = 0;
    for (const tag of this.state.tags) {
      if (tag && tag.text === tagName) {  // TODO: must fix 4-indexed array in this.state.tags! So weird
        return index;
      }
      index++;
    }
    // didn't match any state tags
    return -1;
  }

  setReadingText(newText) {
    /* updates the app's reading text
       newText: any valid JSX expression
    */
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

    this.setState((state, props) => {
      const newNoteArray = state.notes.concat([newNote]);
      return { notes: newNoteArray };
    });
  }

  formatElement(currentNode, selectedTag, matchesMemo) {
    /*
    returns a new element with formatting applied based on the selected tag
    helper for handleDisplayClick
    currentNode: reference to the current node, for iteration
    selectedTag: reference to the tag whose notes should be displayed
    matchesMemo: array singleton to track number of keyphrase matches
    */
    // base case: reached a leaf
    if (!currentNode || currentNode.type === 'string') {
      return
    }

    // for each child node of the readingText outer node, check its children until the child is a text node
    for (let nodeIndex = 0; nodeIndex < currentNode.props.children.length; ++nodeIndex) {  // use childNodes to include text nodes
      let child = currentNode.props.children[nodeIndex];

      // reached a "text node"
      if (typeof child.props.children === 'string') {
        // check for match with any of this tag's notes' keyphrases
        for (const note of selectedTag.notes) {
          const keyphrase = note.keyphrase;
          if (child.textContent.includes(keyphrase)) {
            // Here! Found a keyphrase match
            matchesMemo[0]++;

            // determine which HTML tag to use
            /* TODO: use this for long-term
            let settings = {
              location: '',  // inline, footnote, or hover
              tagType: span,  // can't use variable tag types in JSX
              className: ''
            };
            */
            let tagType = 'span';
            for (const tag of note.tags) {
              if (tag === 'highlight') {
                tagType = 'mark';
              }
            }
            let htmlWrapper = Document.createElement(tagType);

            // apply CSS-formatted versions of the display-related tags as class name
            let classes = '';
            for (const tag of note.tags) {
              if (tag === 'highlight') {
                classes += tag.replace(' ', '-');
              } else {
                classes += tag.replace(' ', '-');
              }
            }
            htmlWrapper.className = classes;
            
            // split the text node on keyphrase (retaining keyphrase in result)
            // in regex, () includes the delimiter in the result, g matches all occurrences, and i ignores case
            const parts = child.textContent.split(new RegExp(`(${keyphrase})`, 'gi'));

            // wrap the keyphrase in a new inline element tag (non-inline tags coming soon...)
            const newChildNode = parts.map((substring, index) => {
              // only wrap the keyphrase; leave the other text alone
              if (substring === keyphrase) {
                htmlWrapper.key = index;  // TODO: use unique IDs
                htmlWrapper.textContent = keyphrase;
                return htmlWrapper;
              }

              // this is neighboring non-keyphrase text in the node; just include it in order, unchanged
              return substring;
            });

            // actually update the param node with the formatted version
            currentNode.props.children[nodeIndex] = newChildNode;
          }
        }
      } else {
        // recursive case: this child isn't a text node... but it might have one inside!
        this.formatElement(child, selectedTag, matchesMemo);
      }
    }
  }

  handleDisplayClick(tagName) {
    /*
    updates readingText with the user's annotations
    used https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs for reference
    selectedTag: string referring to the tag object whose notes will be displayed
    */
    // TDOO: add "case sensitive" button
    console.log('handleDisplayClick called! Checking readingText for any keyphrases associated with tags ', tagName, '...');

    const tagIndex = this.getTagIndex(tagName);
    const selectedTag = this.state.tags[tagIndex];
    // check reading text for keyphrase matches
    let matches = [0];  // wrapped in array to be mutable
    let index = 0;
    for (let paragraph of this.state.readingText) {
      // recursively search all of this paragraph's child nodes (this approach preserves existing annotations)
      const newParagraph = this.formatElement(paragraph, selectedTag, matches);

      // update state with the new paragraph
      this.setState((state) => {
        let copy = Array.from(state.readingText);
        copy[index] = newParagraph;
        return { readingText: copy };
      });

      // maintain loop
      index++;
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
