import { React, useState } from "react";
import NoteContext from "./NoteContext";
import { body } from "express-validator";

function NoteState(props) {
  const { showAlert } = props;
  const host = "http://localhost:80";
  const Note = [];

  // Get all the notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/getNotes`, {
      method: "GET",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7fSwiaWF0IjoxNzA0Mzc1MjUzfQ.LA8POEy3b_yesDbtlxVX15w09f68c3u1VUe-YCMHhXQ",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addFunc = async (Title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    showAlert("Note Added", "success");
  };

  // Delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/` + id, {
      method: "DELETE",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const json = await response.json();
    setNotes(newNotes);
    showAlert("Deleted Successfully", "warning");
  };

  // Update a note
  const editNotes = async (id, Title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Title, description, tag }),
    });
    const json = await response.json();

    // Logic to render updated notes on our page
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].Title = Title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    showAlert("Updated Successfully ", "secondary");
  };

  const [notes, setNotes] = useState(Note);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addFunc, deletenote, getAllNotes, editNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
