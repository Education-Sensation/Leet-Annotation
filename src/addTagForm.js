import React from "react";
import Button from "react-bootstrap/Button";

export default class AddTagForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newTag: "" };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log("submitting this tag data: ", this.state.newTag);
    this.props.submitForm(this.state.newTag);
  }

  handleInputChange(event) {
    this.setState({ newTag: event.target.value });
  }

  handleCancel() {
    this.props.hideForm(true);
  }

  render() {
    return (
      <div className="newTag">
        <h4>New Tag</h4>
        <form>
          <label htmlFor="new-tag"></label>
          <input
            className="tag-input"
            id="new-tag"
            name="new-tag"
            type="text"
          ></input>

          <Button
            className="enterTag"
            variant="outline-success"
            type="button"
            onClick={this.handleSubmit}
          >
            Add
          </Button>
          {/* updates <App /> state with the input's value */}
          <Button
            className="cancelTag"
            variant="danger"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </form>
        {/* hides form */}
      </div>
    );
  }
}
