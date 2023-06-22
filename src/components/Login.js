import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate} from "react-router-dom"

const Login = (props) => {

const [credentials, setCredentials] = useState({email : "" , password : "" })
let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://i-notebook-api.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email , password : credentials.password }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success){
        //redirect after saving the auth Token
        localStorage.setItem('authToken',json.authToken);
        props.showAlert("Logged-in successfully", "success");
        navigate('/');
    } else {
        props.showAlert("Invalid Credentials", "danger");
    }
  };
 const onChange = (e) => {
    setCredentials({...credentials , [e.target.name] : e.target.value})
  }

  return (
    <div className="d-flex justify-content-center login-box mt-5">
      <Form onSubmit={handleSubmit}>
        <h1>Welcome to iNotebook</h1>
      <Form.Text className="">
            Log-in to access your notes
          </Form.Text>
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
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log-in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
