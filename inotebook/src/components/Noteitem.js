import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote, showAlert }) => {  // ✅ clean destructuring
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  // ✅ handle delete + alert
  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("Note deleted successfully!", "success");
  };

  return (
    <div className="col-md-4 my-3">
      <div className="card shadow-lg border-0 rounded-4 note-card hover-card">
        <div className="card-body p-4">
          {/* Title */}
          <h5 className="card-title text-dark fw-bold mb-3">{note.title}</h5>

          {/* Description */}
          <p className="card-text text-secondary">{note.description}</p>

          {/* Tag */}
          {note.tag && (
            <div className="mt-2">
              <span
                className="badge rounded-pill text-dark fw-semibold px-3 py-2"
                style={{
                  backgroundColor: "#e0f7fa",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px",
                }}
              >
                #{note.tag}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-danger px-4 py-2 fw-semibold rounded-3"
              onClick={handleDelete}   // ✅ clean handler
            >
              <i className="fa-solid fa-trash me-2"></i> Delete
            </button>

            <button
              className="btn btn-outline-primary px-4 py-2 fw-semibold rounded-3"
              onClick={() => updateNote(note)}
            >
              <i className="fa-solid fa-pen-to-square me-2"></i> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
