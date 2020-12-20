import React from "react";
import AddTagForm from "./addTagForm";
import TagSelector from "./tagSelector";
import Button from "react-bootstrap/Button";

// Return an array of the selected opion values
// select is an HTML select element
function getSelectValues(selectElement) {
  var result = [];
  var options = selectElement && selectElement.options;
  var option;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    option = options[i];

    if (option.selected) {
      result.push(option.value || option.text);
    }
  }
  return result;
}

export default class AddNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagFormIsHidden: true,
      formData: {
        note: "",
        keyPhrase: "",
        tags: [],
      },
    };

    this.handleTagFormDisplay = this.handleTagFormDisplay.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleKeyPhraseChange = this.handleKeyPhraseChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this);
  }

  handleTagFormDisplay(shouldHide) {
    // if bool shouldHide is true, hides form; else, shows form
    this.setState({ tagFormIsHidden: shouldHide });
  }

  handleNoteChange(event) {
    this.setState({
      formData: { ...this.state.formData, note: event.target.value },
    });
  }

  handleKeyPhraseChange(event) {
    this.setState({
      formData: { ...this.state.formData, keyPhrase: event.target.value },
    });
  }

  handleTagsChange(event) {
    const newTagArray = getSelectValues(event.target);

    this.setState((state, props) => {
      console.log("replacing ", state.formData.tags, " with ", newTagArray);
      return { formData: { ...state.formData, tags: newTagArray } };
    });
  }

  submitNewNote() {
    console.log("submitting this formData to App... ", this.state.formData);
    this.props.submitNewNote(this.state.formData);
    // TODO: is there an easy way to clear fields here?
    alert("Note Added!");
  }

    render() {
        // decide whether to show the <AddTagForm /> or just an empty div
        const emptySpan = <span></span>;
        let tagForm = emptySpan;

        if (!this.state.tagFormIsHidden) {
            tagForm = <AddTagForm hideForm={this.handleTagFormDisplay} submitForm={this.props.submitNewTag} />;
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
                onChange={this.handleNoteChange}
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
                onChange={this.handleKeyPhraseChange}
              ></input>
    
              {/* TODO: change this to use props */}
              <label htmlFor="tags-field">tags</label>
              <select
                multiple={true}
                name="tags-field"
                id="tags-field"
                onChange={this.handleTagsChange}
              >
                <option>tag1</option>
                <option>tag2</option>
                <option>tag3</option>
              </select>
    
              {/* testing before deleting the placeholder tags above */}
              <TagSelector tagList={this.props.tagList} />
    
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
              <Button
                variant="outline-success"
                onClick={this.submitNewNote}
                type="button"
              >
                Enter
              </Button>
            </form>
            {tagForm}
          </div>
        );
        }
  }
}
