import React from "react";
import "./Dashboard.css"; 

import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <nav className="sidebar">
        <ul>
          <li>Home</li>
       
       
            <Link  to="/add-project">Add New Project</Link><br/>
            <Link to="/view-project">View Project</Link>
          
          
        </ul>
      </nav>
      <div className="content">
        <h1>  Welcome To GSK</h1>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
