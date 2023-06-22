import React, { useContext, useEffect, useState, useRef  } from "react";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes , editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  // states and methods for Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      getNotes();
      navigate('/')
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    editNote(note.id , note.etitle , note.edescription , note.etag )
    refClose.current.click();
    props.showAlert("Note updated" , "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Button
        variant="primary"
        className="d-none"
        ref={ref}
        onClick={handleShow}
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="etitle"
                value={note.etitle}
                placeholder="Update title"
                onChange={onChange}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="etag"
                value={note.etag}
                placeholder="Update your tag"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="edescription"
                value={note.edescription}
                placeholder="Update description"
                onChange={onChange}
                minLength={5}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" ref={refClose} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Your Notes</h2>
      <div className="row">
        <div className="container">
        {notes.length === 0 && "no notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
