import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "https://i-notebook-api.vercel.app/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //get notes
  const getNotes = async () => {
     //fetch API
     const response = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      }
    });
    const json = await response.json();
    setNotes(json)
  };

 //add notes
  const addNote = async (title, description, tag) => {
     //fetch API
     const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken'),
      },
      body: JSON.stringify({title , description , tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      },
      body: JSON.stringify({title , description , tag}),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit the note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break ; 
      }
    }
    setNotes(newNotes);
  };
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      }
    });
    const json = await response.json();
    console.log(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote , getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
