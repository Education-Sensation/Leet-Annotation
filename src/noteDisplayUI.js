import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TagSelector from "./tagSelector";

class NoteDisplayUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {tags: []};

    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleDisplayClick = this.handleDisplayClick.bind(this);
  }

  handleTagsChange(selectedTagValues) {
    this.setState((state, props) => {
      console.log("replacing ", state.tags, " with ", selectedTagValues);
      return { tags: selectedTagValues };
    });
  }

  handleDisplayClick() {
    console.log('displaying notes for tags ', this.state.tags);
    this.props.onDisplayClick(this.state.tags);
  }

  render() {
    return (
      <div className="noteDisplay">
        <h4>Select a keyword and see the Notes associated.</h4>
        <form>
          {/* add onClick function that will replace text component */}
          <Dropdown as={ButtonGroup} className="dropdown">
            <Button onClick={this.handleDisplayClick} variant="info">Show/Hide Notes</Button>
  
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
  
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another keyword</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Another keyword</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* TODO: please put this into the Dropdown show/hide area in place of the current Dropdown.Menu */}
          <TagSelector tagList={this.props.tagList} onTagSelect={this.handleTagsChange} />

        </form>
        <br />
      </div>
    );  
  }
}

export default NoteDisplayUI;
