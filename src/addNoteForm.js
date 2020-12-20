import React from "react";
import AddTagForm from "./addTagForm";

export default class AddNoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagFormIsHidden: true,
            formData: {
                note: '',
                keyPhrase: '',
                tags: '',
            }
        };

        this.handleTagFormDisplay = this.handleTagFormDisplay.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleKeyPhraseChange = this.handleKeyPhraseChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.submitNewNote = this.submitNewNote.bind(this);
    }

    handleTagFormDisplay(shouldHide) {
        // if bool shouldHide is true, hides form; else, shows form        
        this.setState({tagFormIsHidden: shouldHide});
    }

    handleNoteChange(event) {
        this.setState({formData: {...this.state.formData, note: event.target.value}})
    }

    handleKeyPhraseChange(event) {
        this.setState({formData: {...this.state.formData, keyPhrase: event.target.value}})
    }

    handleTagsChange(event) {
        this.setState({formData: {...this.state.formData, tags: event.target.value}})
    }

    submitNewNote() {
        console.log('submitting this formData to App... ', this.state.formData);
        this.props.submitNewNote(this.state.formData);
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
                <h3>New Note</h3>
                <form>
                <label htmlFor="note-field"></label>
                <textarea
                    name="note-field"
                    id="note-field"
                    placeholder="have any thoughts to write?"
                    onChange={this.handleNoteChange}
                ></textarea>

                <label htmlFor="keyphrase-field">key phrase</label>
                <input name="keyphrase-field" id="keyphrase-field" type="text" onChange={this.handleKeyPhraseChange}></input>

                <label htmlFor="tags-field">tags</label>
                <input name="tags-field" id="tags-field" type="text" onChange={this.handleTagsChange}></input>

                {/* shows <AddTagForm /> */}
                <button type='button' onClick={() => {
                        this.handleTagFormDisplay(false);
                    }}>create new tag &#12297;</button>

                {/* add this note to the App component’s dictionary */}
                <button type='button' onClick={this.submitNewNote}>Enter</button>

                </form>

                {tagForm}

            </div>
      );
    }
  }