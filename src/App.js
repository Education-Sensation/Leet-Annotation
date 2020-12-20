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
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
          <div className="fixed-bottom position-sticky" id="footer">
            <Accordion className="accordian-contents">
              <Card className="card">
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me to Show/Hide Notes for a tag or add a New Note!
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
        </div>
      </div>
    );
  }
}

export default App;
