import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import AddProject from "./components/AddProject";
import ViewProjects from "./components/View Projects"; // Import the ViewProjects component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/projects" element={isLoggedIn ? <Projects /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-project" element={isLoggedIn ? <AddProject /> : <Navigate to="/login" />} />
        <Route path="/view-project" element={isLoggedIn ? <ViewProjects /> : <Navigate to="/login" />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;