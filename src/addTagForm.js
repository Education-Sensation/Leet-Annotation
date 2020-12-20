import React from "react";
import Button from "react-bootstrap/Button";

export default class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
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

          <Button className="enterTag" variant="outline-success" type="button">
            Enter
          </Button>
          {""}
          {/* updates <App /> state with the input's value */}
          <Button
            className="cancelTag"
            variant="danger"
            onClick={this.handleClick}
          >
            Cancel
          </Button>
          {""}
        </form>
        {/* hides form */}
      </div>
    );
  }
}
