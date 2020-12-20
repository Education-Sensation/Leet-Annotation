import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
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

class App extends React.Component {
  constructor() {
    super();
    // this.state = {readingText: this.getText()};  // TODO 1: readingText is an array of strings each representing paragraphs (currently just a string)
    this.state = {
      readingText:
        "initial text - Kevin, wait a bit for your blessed paragraphs. It was easier as a plain string",
    };
    this.setReadingText = this.setReadingText.bind(this);
  }

  setReadingText(newText) {
    this.setState({ readingText: newText });
  }

  getText = async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1"
    );
    const data = await response.json(); // TODO 1: please assign an array to this data varaible, so setReadingText() in the next line sets this.readingText to an array of strings. See below TODO
    this.setReadingText(data);
  };

  render() {
    const paragraphs = <p>{this.state.readingText}</p>; // TODO 1: once this.state.readingText is an array of strings, uncomment the below code to replace this temp line
    // const paragraphs = this.state.readingText.map((item, index) => {
    //   return <p key={index}>{item}</p>;
    // });

    return (
      <div className="App">
        {/* -- Jumbotron - Header Code --  */}
        <Jumbotron fluid>
          <Container>
            <h1>Leet Annotation</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>

        {/* -- Text Container -- */}
        <div className="readingText">{paragraphs}</div>

        <AddReadingTextForm submitNewReadingText={this.setReadingText} />

        {/* -- Footer, show New Note, Show and Hide Notes, etc. -- */}
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me to Show/Hide notes for a tag or add a New Note!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <NoteDisplayUI />
                <AddNoteForm />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default App;
