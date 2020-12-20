import React from "react";

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
      <div>
        <h4>New Tag</h4>
        <form>
          <label htmlFor="new-tag"></label>
          <input id="new-tag" name="new-tag" type="text"></input>
          <button type="button">Enter</button>
          {""}
          {/* updates <App /> state with the input's value */}
          <button type="button" onClick={this.handleClick}>
            Cancel
          </button>
          {""}
        </form>
        {/* hides form */}
      </div>
    );
  }
}
