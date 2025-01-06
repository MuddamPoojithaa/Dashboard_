import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the server
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="projects-page">
      <h1>Our Projects</h1>
      <div className="projects-container">
        {projects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              <img
                src={`http://localhost:5000/uploads/${project.image}`}
                alt={project.projectName}
                width="300" // Adjust size as needed
                height="200"
              />
              <h3>{project.projectName}</h3>
              <p>Location: {project.location}</p>
              <p>Description: {project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
