import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Multiselect from "react-bootstrap-multiselect";

export default function TagSelector(props) {
  console.log(props.tagList); // array of 4 empty objects followed by the correct 4 objects

  let options = new Array(props.tagList.length);

  // populate array of option tags
  props.tagList.forEach((tagObject) => {
    console.log(
      "making <option> for ",
      tagObject.text,
      " with id ",
      tagObject.id
    );
    options.push(<option key={tagObject.id}>{tagObject.text}</option>);
  });

  return (
    <DropdownButton
      id="dropdown-item-button"
      title="Select one or multiple tags"
    >
      <select
        className="droptags"
        multiple={true}
        name="tags-field"
        id="tags-field"
      >
        {options}
      </select>
    </DropdownButton>
  );
}
