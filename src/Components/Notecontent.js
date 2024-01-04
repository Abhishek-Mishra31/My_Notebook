import { React, useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NoItems from "./NoItems";
import { useNavigate } from "react-router-dom";

export const Notecontent = () => {
  const context = useContext(NoteContext);
  const { notes, deletenote, getAllNotes, editNotes } = context;
  const navigate = useNavigate();
  const [Enote, setEnote] = useState({
    eId: "",
    eTitle: "",
    eDescription: "",
    eTag: "",
  });
  const ref = useRef(null);
  const closeRef = useRef(null);

  const updateNotes = (e) => {
    e.preventDefault();
    editNotes(Enote.eId, Enote.eTitle, Enote.eDescription, Enote.eTag);
    closeRef.current.click();
  };

  const onChange = (e) => {
    setEnote({ ...Enote, [e.target.name]: e.target.value });
  };

  const handleClick = (currentNote) => {
    ref.current.click();
    setEnote({
      eId: currentNote._id,
      eTitle: currentNote.Title,
      eDescription: currentNote.description,
      eTag: currentNote.tag,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {notes.length === 0 ? (
        <NoItems />
      ) : (
        <div className="container">
          <h2>Your Notes</h2>
          <div className="row">
            {notes.map((note) => {
              return (
                <div className="card mx-3 my-3" style={{ width: "15rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{note.Title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-end mx-2">
                      <box-icon
                        type="solid"
                        name="edit"
                        onClick={() => {
                          handleClick(note);
                        }}
                      ></box-icon>
                      <box-icon
                        type="solid"
                        name="trash"
                        onClick={() => {
                          deletenote(note._id);
                        }}
                      ></box-icon>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EditModal from Bootstrap */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={Enote.eTitle}
                    name="eTitle"
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
                    value={Enote.eDescription}
                    name="eDescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={Enote.eTag}
                    name="eTag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateNotes}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
