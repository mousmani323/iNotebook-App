import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate} from "react-router-dom"

const Signup = (props) => {
    
const [credentials, setCredentials] = useState({name: "" ,email : "" , password : "" , cpassword : ""})
let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password ,cpassword } = credentials
    if (password !== cpassword) {
      props.showAlert("Password and Confirm Password must match", "danger");
      return;
    }
    const response = await fetch("http://https://i-notebook-api.vercel.app/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
        //redirect after saving the auth Token
        localStorage.setItem('authToken',json.authToken);
        props.showAlert("User created Successfully" , "success")
        navigate('/');
    } else {
        props.showAlert("User already exists" , "warning")
    }
  };
 const onChange = (e) => {
    setCredentials({...credentials , [e.target.name] : e.target.value})
  }

  return (
    <div className="d-flex justify-content-center login-box">
      <Form onSubmit={handleSubmit}>
        <h1>Welcome to iNotebook</h1>
      <Form.Text className="">
            Sign-up to create your account
          </Form.Text>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-type your password"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign-up
        </Button>
      </Form>
    </div>
  );
}

export default Signup
