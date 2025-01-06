import React, { useState, useEffect } from "react";
import "./View Projects.css";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the server
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleDelete = (id) => {
    console.log(`Attempting to delete project with id: ${id}`);
  
    fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          console.log("Delete response:", result);
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== id)
          );
        } else {
          console.error("Delete failed:", result.message);
          alert(`Delete failed: ${result.message}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting project:", error.message);
        alert(`Error deleting project: ${error.message}`);
      });
  };
  

  return (
    <div className="projects-page">
      <h1>View Projects</h1>
      <div className="projects-container">
        {projects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          <table className="projects-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td>{project.location}</td>
                  <td>{project.description}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${project.image}`}
                      alt={project.projectName}
                      className="project-image"
                    />
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewProjects;


