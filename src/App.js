import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ContactsProvider from "./context/ContactsContext";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Group from "./components/Dashboard/Group";

function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/groups" element={<Group />} />

            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </ContactsProvider>
    </AuthProvider>
  );
}

export default App;
