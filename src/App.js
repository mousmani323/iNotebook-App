import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/notestate";
import AlertG from "./components/AlertG";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


const  App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <>
      <NoteState>
        <Navigation />
        <AlertG alert={alert} />
        <div className="container">
        <Routes>
          <Route path="/" element={<Home  showAlert={showAlert}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup  showAlert={showAlert}/>} />
        </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
