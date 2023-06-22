import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  let location = useLocation();
  let navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem('authToken')
  navigate('/login')
 }
  
  return (
    <>
    <Navbar bg="dark" variant= "dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">iNotebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={`${location.pathname==='/'?"active" : ""}`} href="/">Home</Nav.Link>
            <Nav.Link className={`${location.pathname==='/about'?"active" : ""}`} href="/about">about</Nav.Link>
          </Nav>
           {!localStorage.getItem('authToken') ? 
          <Nav className="p-absolute right-zero ">
           <Nav.Link className="btn btn-primary mx-1 " href="/login">Login</Nav.Link>
            <Nav.Link className="btn btn-primary mx-1 " href="/signup">Sign-up</Nav.Link>
          </Nav>
          : <Button className="btn btn-primary mx-1 " onClick={handleLogout} href="/login">Log out</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navigation