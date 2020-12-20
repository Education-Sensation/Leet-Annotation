import React from "react";
import AddTagForm from "./addTagForm";
import Button from "react-bootstrap/Button";

export default class AddNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tagFormIsHidden: true };
    this.handleTagFormDisplay = this.handleTagFormDisplay.bind(this);
  }

  handleTagFormDisplay(shouldHide) {
    // if bool shouldHide is true, hides form; else, shows form
    this.setState({ tagFormIsHidden: shouldHide });
  }

  render() {
    // decide whether to show the <AddTagForm /> or just an empty div
    const emptySpan = <span></span>;
    let tagForm = emptySpan;

    if (!this.state.tagFormIsHidden) {
      tagForm = <AddTagForm hideForm={this.handleTagFormDisplay} />;
    }

    return (
      <div>
        <h4>Add a New Note</h4>
        <form>
          <label htmlFor="note-field"></label>

          <textarea
            className="newnote"
            name="note-field"
            id="note-field"
            placeholder="have any thoughts to write?"
            cols="30"
            rows="5"
          ></textarea>
          <br />

          <label htmlFor="keyphrase-field">
            <strong>Key Phrase:</strong>{" "}
          </label>
          <input
            className="keyphrase"
            name="keyphrase-field"
            id="keyphrase-field"
            type="text"
          ></input>

          <label htmlFor="tags-field">
            <strong>Tags: </strong>{" "}
          </label>
          <input
            className="tags"
            name="tags-field"
            id="tags-field"
            type="text"
          ></input>

          {/* shows <AddTagForm /> */}
          <Button
            className="createNewTag"
            variant="outline-secondary"
            type="button"
            onClick={() => {
              this.handleTagFormDisplay(false);
            }}
          >
            Create a new tag &#12297;
          </Button>

          {/* add this note to the App component’s dictionary */}
          <Button variant="outline-success" type="button">
            Enter
          </Button>
        </form>

        {tagForm}
      </div>
    );
  }
}
