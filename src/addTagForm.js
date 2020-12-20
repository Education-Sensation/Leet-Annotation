import React from "react";

export default class AddTagForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {newTag: ''};

        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
    }

    handleSubmit() {
        console.log('submitting this tag data: ', this.state.newTag);
        this.props.submitForm([this.state.newTag]);
    }

    handleInputChange(event) {
        this.setState({newTag: event.target.value});
    }

    handleCancel() {
        this.props.hideForm(true);
    }

    render() {
        return (
            <div>
                <h3>New Tag</h3>
                <form>
                    <label htmlFor="new-tag"></label>
                    <input id="new-tag" name="new-tag" type="text" onChange={this.handleInputChange}></input>
        
                    <button type='button' onClick={this.handleSubmit}>Add</button>  {/* updates <App /> state with the input's value */}
                </form>
                    <button type='button' onClick={this.handleCancel}>Cancel</button>  {/* hides form */}
            </div>
          );
    }
}
