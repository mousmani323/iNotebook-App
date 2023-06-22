import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/notecontext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title :"" , description : "" , tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title , note.description , note.tag)
        setNote({title :"" , description : "" , tag: ""})
        props.showAlert("Note is added successfully" , "success")
    }
    const onChange = (e) => {
        setNote({...note , [e.target.name] : e.target.value})
    }

  return (
    <div className="container my-3">
      <h1>Enter Your note here</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={note.title} name="title" placeholder="Enter title" onChange={onChange} minLength={5}
                required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" name="tag" value={note.tag} placeholder="give a tag" onChange={onChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control type="description" name="description" value={note.description} placeholder="Enter description" onChange={onChange} minLength={5}
                required/>
        </Form.Group>
        <Button disabled={note.title.length<5 || note.description.length<5} variant="primary" type="submit" onClick={handleClick}>
          Add Note
        </Button>
      </Form>
    </div>
  )
}

export default AddNote