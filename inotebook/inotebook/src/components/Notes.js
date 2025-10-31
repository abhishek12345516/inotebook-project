import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const { showAlert } = props;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // 🔹 Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("🔴 No token found — redirecting to login");
        navigate("/login");
      } else {
        try {
          await getNotes();
        } catch (error) {
          console.error("❌ Error fetching notes:", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchNotes();
    // eslint-disable-next-line
  }, [navigate]);

  // 🔹 Update note modal trigger
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click(); // open modal
  };

  // 🔹 Handle form changes
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // 🔹 Handle update click
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); // close modal
    showAlert("Note updated successfully!", "success");
  };

  return (
    <>
      {/* Add Note Section */}
      <AddNote showAlert={showAlert} />

      {/* Hidden Modal Trigger */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch Edit Modal
      </button>

      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-semibold" id="editNoteModalLabel">
                ✏️ Edit Note
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                    minLength={5}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg rounded-3"
                    id="edescription"
                    name="edescription"
                    rows="4"
                    value={note.edescription}
                    onChange={handleChange}
                    placeholder="Write your note here..."
                    required
                    minLength={5}
                  ></textarea>
                </div>

                {/* Tag */}
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label fw-semibold">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleChange}
                    placeholder="e.g. Personal, Work, Ideas"
                    minLength={3}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="row my-4">
        <h2>Your Notes</h2>

        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
              note={note}
            />
          ))
        ) : (
          <p className="text-muted mt-3">No notes to display...</p>
        )}
      </div>
    </>
  );
};

export default Notes;
