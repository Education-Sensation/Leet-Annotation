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
            name="note-field"
            id="note-field"
            placeholder="have any thoughts to write?"
          ></textarea>

          <label htmlFor="keyphrase-field">key phrase</label>
          <input
            name="keyphrase-field"
            id="keyphrase-field"
            type="text"
          ></input>

          <label htmlFor="tags-field">tags</label>
          <input name="tags-field" id="tags-field" type="text"></input>

          {/* shows <AddTagForm /> */}
          <button
            type="button"
            onClick={() => {
              this.handleTagFormDisplay(false);
            }}
          >
            create new tag &#12297;
          </button>

          {/* add this note to the App component’s dictionary */}
          <button type="button">Enter</button>
        </form>

        {tagForm}
      </div>
    );
  }
}
