import React from "react";

const AddReadingTextForm = () => {
  return (
    <div className="newReadingStyle">
      <h1>New Reading Text</h1>
      <form>
        <textarea name="newReadingText" cols="100" rows="10"></textarea>
        {/* add onClick function that will replace text component */}
        <button className="newTextButton" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddReadingTextForm;
