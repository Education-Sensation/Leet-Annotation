import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const NoteDisplayUI = () => {
  return (
    <div className="noteDisplay">
      <h4>Select a keyword and see the Notes associated.</h4>
      <form>
        {/* add onClick function that will replace text component */}
        <Dropdown as={ButtonGroup} className="dropdown">
          <Button variant="info">Show/Hide Notes</Button>

          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another keyword</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Another keyword</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </form>
      <br />
    </div>
  );
};

export default NoteDisplayUI;
