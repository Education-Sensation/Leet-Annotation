import React from "react";

export default class addReadingTextForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.props.setReadingText({ readingText: event.target.value });
    event.preventDefault();
  };

  render() {
    return (
      <div className="newReadingStyle">
        <h1>New Reading Text</h1>
        <form onSubmit={this.props.handleChange}>
          <textarea
            name="newReadingText"
            cols="100"
            rows="10"
            //value={[]}
          ></textarea>
          {/* add onClick function that will replace text component */}
          <button className="newTextButton" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}
