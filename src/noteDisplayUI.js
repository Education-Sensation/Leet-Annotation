import React from "react";

const NoteDisplayUI = () => {
  return (
    <div className="noteDisplay">
      <h1>New Note</h1>
      <form>
        {/* add onClick function that will replace text component */}
        <button className="noteDisplayButton" type="submit">
          show/hide all notes for this tag
        </button>
        <label for="keywords">Select a keyword:</label>
        <select id="keys" name="keys">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </form>
    </div>
  );
};

export default NoteDisplayUI;
