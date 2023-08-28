import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadhar: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@inmar\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert("Please use a valid @inmar.com email.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      alert(
        "Password should be at least 8 characters long with at least one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];

    if (users.some((user) => user.email === formData.email)) {
      alert("User with this email already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(formData.email, JSON.stringify([]));

    login();
    alert("User registered successfully!");
    navigate("/login");
  };

  return (
    <div className="container-signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form-signup">
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input type="text" name="lastName" onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Aadhar #: </label>
          <input type="text" name="aadhar" onChange={handleChange} required />
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
        <div className="signup-btns-container">
          <button type="submit">Sign Up</button>
          <button onClick={() => navigate("/login")}>Back to Login Page</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
