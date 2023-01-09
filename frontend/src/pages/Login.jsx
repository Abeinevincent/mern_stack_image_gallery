import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      console.log(res.data);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login Form</span>
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
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="row button">
            <input type="submit" onClick={loginUser} value="Login" />
          </div>
          <div className="signup-link">
            Don't have an account?<Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
