import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./AddProject.css"; 


const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/projects/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload project");
      }

      const result = await response.json();
      alert(result.message); // Show success message
      navigate("/projects"); // Redirect to projects page after upload
    } catch (error) {
      console.error("Error uploading project:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="add-project-container">
      <h2>Upload New Project</h2>
      <form className="add-project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="upload-button">
          Upload Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;