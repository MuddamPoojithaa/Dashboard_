const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// File path for storing projects
const projectsFilePath = path.join(__dirname, "projects.json");

// Function to load projects from file
const loadProjects = () => {
  if (fs.existsSync(projectsFilePath)) {
    const data = fs.readFileSync(projectsFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Function to save projects to file
const saveProjects = (projects) => {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

// Load projects from file
let projects = loadProjects();

app.post("/api/projects/upload", upload.single("image"), (req, res) => {
  const { projectName, location, description } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  const newProject = {
    id: Date.now(),
    projectName,
    location,
    description,
    image: imagePath,
  };

  projects.push(newProject);
  saveProjects(projects);

  res.status(200).json({
    message: "Project uploaded successfully!",
    project: newProject,
  });
});

app.get("/api/projects", (req, res) => {
  res.status(200).json({ projects });
});

app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Received DELETE request for project ID: ${id}`);

  const projectIndex = projects.findIndex((project) => project.id === parseInt(id, 10));
  if (projectIndex !== -1) {
    const [deletedProject] = projects.splice(projectIndex, 1);
    console.log(`Deleting project:`, deletedProject);

    if (deletedProject.image) {
      const imagePath = path.join(__dirname, "uploads", deletedProject.image);
      console.log(`Deleting image file: ${imagePath}`);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image file ${imagePath}:`, err);
        } else {
          console.log(`Image file ${imagePath} deleted successfully.`);
        }
      });
    }

    saveProjects(projects);
    res.status(200).json({ message: "Project deleted successfully!" });
  } else {
    res.status(404).json({ message: "Project not found!" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));