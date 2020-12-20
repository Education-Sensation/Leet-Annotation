import React from "react";

export default class addReadingTextForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {newParagraphs: []};  // tracks textarea input
  }

  handleAddClick() {
    console.log('submitting this (hopefully new) reading text to App: ', this.state.newParagraphs);
    this.props.submitNewReadingText(this.state.newParagraphs);  // pass textarea value (as recorded in state)
  };

  handleTextChange(event) {
    console.log('changing state in handleTextChange() from ', this.state.newParagraphs, ' to ', event.target.value);
    this.setState({newParagraphs: event.target.value});
  }

  render() {
    return (
      <div className="newReadingStyle">
        <h1>New Reading Text</h1>
        <form>
          <textarea
            name="newReadingText"
            cols="100"
            rows="10"
            onChange={this.handleTextChange}
            //value={[]}
          ></textarea>
          {/* replaces text in ReadingText component */}
          <button onClick={this.handleAddClick} className="newTextButton" type="button">
            Add
          </button>
        </form>
      </div>
    );
  }
}