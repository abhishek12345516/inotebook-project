import NoteContext from "./NoteContext";

import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  // Initialize empty notes array
  const [notes, setNotes] = useState([]);

  //  Get All Notes
  const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();
  console.log("Fetched Notes:", json);

  // 🧠 Handle both array and object-based responses
  if (Array.isArray(json)) {
    setNotes(json);
  } else if (json.notes && Array.isArray(json.notes)) {
    setNotes(json.notes);
  } else {
    console.warn("⚠️ Unexpected response shape from API:", json);
    setNotes([]);
  }
};


  //  Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), // ✅ dynamically get token
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    console.log("Note added to DB:", note);

    // ✅ Only update state if note added successfully
    if (!note.error) {
      setNotes(notes.concat(note)); // Adds new note to the list instantly
    }
  };

  //  Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
       headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), // ✅ dynamically get token
      },
    });

    const json = await response.json();
    console.log("Note deleted:", json);

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), // ✅ dynamically get token
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("Note updated:", json);

    // Update note in local state
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
  };

  // 🟣 Return Provider
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
