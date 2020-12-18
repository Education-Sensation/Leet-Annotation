import React from "react";

export default function AddNoteForm() {
  return (
    <div>
      <h3>New Note</h3>
      <form>
        <label for="note-field"></label>
        <textarea
          name="note-field"
          id="note-field"
          placeholder="have any thoughts to write?"
        ></textarea>

        <label for="keyphrase-field">key phrase</label>
        <input name="keyphrase-field" id="keyphrase-field" type="text"></input>

        <label for="tags-field">tags</label>
        <input name="tags-field" id="tags-field" type="text"></input>

        {/* shows <AddTagForm /> */}
        <button>create new tag &#12297;</button>

        {/* add this note to the App component’s dictionary */}
        <button>Enter</button>
      </form>
    </div>
  );
}
