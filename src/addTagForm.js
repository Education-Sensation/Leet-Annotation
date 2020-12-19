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
                <h3>New Tag</h3>
                <form>
                    <label htmlFor="new-tag"></label>
                    <input id="new-tag" name="new-tag" type="text"></input>
        
                    <button type='button'>Enter</button>  {/* updates <App /> state with the input's value */}
                </form>
                    <button type='button' onClick={this.handleClick}>Cancel</button>  {/* hides form */}
            </div>
          );
    }
}
