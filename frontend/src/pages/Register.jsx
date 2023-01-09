import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      fullname,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );
      console.log(res.data);
      setEmail("");
      setFullname("");
      setPassword("");
      setUsername("");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Register Form</span>
        </div>
        <form>
          {error && (
            <div style={{ color: "red" }}>Something went wrong! try again</div>
          )}
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Fullname"
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="row button">
            <input type="submit" onClick={registerUser} value="Login" />
          </div>
          <div className="signup-link">
            Already have an account?<Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
