import React from "react";

export default function AddTagForm() {
  return (
    <div>
        <h3>New Tag</h3>
        <form>
            <label for="new-tag"></label>
            <input id="new-tag" name="new-tag" type="text"></input>

            <button>Enter</button>
        </form>
    </div>
  );
}
