import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const { setToken } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (message && message.status === "success") {
      navigate("/AllJobs");
    }
  }, [message, navigate]);

  const loginHandler = () => {
    const user = { email, password };

    axios
      .post("https://recruiter-inc.onrender.com/users/login", user)
      .then((response) => {
        setMessage({ data: response.data.message, status: "success" });
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  return (
    <Form className="loginDiv">
      <Form.Group>
        <Form.Label>Login:</Form.Label>
        <br />
        <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </Form.Group>
      {message && <div className={`${message.status}`}>{message.data}</div>}
      <br />
      <Button className="loginBtn" onClick={loginHandler}>
        Login
      </Button>
      <br />
    </Form>
  );
};

export default Login;
