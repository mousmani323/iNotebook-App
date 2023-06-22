import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import NoteContext from "../context/notes/notecontext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare ,faTrash } from '@fortawesome/free-solid-svg-icons'

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note , updateNote } = props;
  return (
    <div className="col-md-3">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <i className="mx-2" onClick={()=>{updateNote(note)}} href="/"><FontAwesomeIcon icon={faPenToSquare} /></i>
          <i className="mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("deleted successfully" , 'success')}}><FontAwesomeIcon icon={faTrash} /></i>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Noteitem;
