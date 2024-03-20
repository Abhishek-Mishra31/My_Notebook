import { React, useState, useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import { Notecontent } from "./Notecontent";

export const Addnote = (props) => {
  const { showAlert } = props;
  const { addFunc } = useContext(NoteContext);
  const [notes, setNotes] = useState({ Title: "", Description: "", Tag: "" });

  const add = (e) => {
    e.preventDefault();
    addFunc(notes.Title, notes.Description, notes.Tag);
    setNotes({ Title: "", Description: "", Tag: "" });
  };

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form container my-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="Text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="Title"
              value={notes.Title}
              onChange={onChange}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="Text"
              className="form-control"
              id="exampleInputPassword1"
              name="Description"
              onChange={onChange}
              value={notes.Description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="Text"
              className="form-control"
              id="Tag"
              name="Tag"
              value={notes.Tag}
              onChange={onChange}
            />
          </div>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              type="submit"
              onClick={add}
              className="btn btn-primary"
              disabled={notes.Title.length < 1 || notes.Description.length < 1}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
      <Notecontent />
    </>
  );
};
