import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);
      const user = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", user.email);
        navigate("/groups");
        login();
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("No user registered with that email.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-btns-container">
          <button type="submit">Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
