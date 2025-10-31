import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!note.title || !note.description) {
      props.showAlert("Please fill out both Title and Description!", "warning");
      return;
    }

    await addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });

    props.showAlert("Note added successfully!", "success"); // ✅ show success message
  };

  return (
    <div className="container my-5 px-3">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-11">
          <div
            className="card border-0 shadow-lg rounded-4"
            style={{
              background: "linear-gradient(135deg, #f9f9fb, #eef2f7)",
            }}
          >
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold text-primary">
                📝 Add a New Note
              </h2>

              <form>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3 shadow-sm"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    style={{ border: "1px solid #ccc" }}
                    required
                    minLength={5}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg rounded-3 shadow-sm"
                    id="description"
                    name="description"
                    rows="4"
                    value={note.description}
                    onChange={handleChange}
                    placeholder="Write your note here..."
                    style={{ border: "1px solid #ccc" }}
                    required
                    minLength={5}
                  ></textarea>
                </div>

                {/* Tag */}
                <div className="mb-4">
                  <label htmlFor="tag" className="form-label fw-semibold">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3 shadow-sm"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                    placeholder="e.g. Personal, Work, Ideas"
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>

                {/* Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-lg rounded-4 fw-semibold text-white shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #007bff, #6610f2)",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background =
                        "linear-gradient(135deg, #0056b3, #520dc2)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background =
                        "linear-gradient(135deg, #007bff, #6610f2)")
                    }
                    onClick={handleClick}
                    disabled={note.title.length < 5 || note.description.length < 5}
                  >
                    ➕ Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4 text-muted small">
            Your notes are <strong>securely saved</strong> and accessible anytime 💾
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
