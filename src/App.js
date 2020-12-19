import logo from "./logo.svg";
import "./App.css";
import AddNoteForm from "./addNoteForm";
import AddReadingTextForm from "./addReadingTextForm";
import NoteDisplayUI from "./noteDisplayUI";

function App() {
  return (
    <div className="App">
      <h1>Leet Reader</h1>
      <AddNoteForm />
      <AddReadingTextForm />
    </div>
  );
}

export default App;
