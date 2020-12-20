import React from "react";
import Button from "react-bootstrap/Button";

export default class addReadingTextForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = { newParagraphs: [] }; // tracks textarea input
  }

  handleAddClick() {
    console.log(
      "submitting this (hopefully new) reading text to App: ",
      this.state.newParagraphs
    );
    if (this.state.newParagraphs != "") {
      this.props.submitNewReadingText(this.state.newParagraphs); // pass textarea value (as recorded in state)
    }
  }

  handleTextChange(event) {
    console.log(
      "changing state in handleTextChange() from ",
      this.state.newParagraphs,
      " to ",
      event.target.value
    );
    this.setState({ newParagraphs: event.target.value });
  }

  render() {
    return (
      <div className="newReadingStyle">
        <h3>Enter new text to be annotated:</h3>
        <form>
          <textarea
            name="newReadingText"
            cols="100"
            rows="10"
            onChange={this.handleTextChange}
          ></textarea>
          {/* replaces text in ReadingText component */}
          <br />
          <Button
            variant="success"
            onClick={this.handleAddClick}
            className="newTextButton"
            type="button"
          >
            Add!
          </Button>
        </form>
      </div>
    );
  }
}
