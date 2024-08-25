//  This file defines routes for handling user registration, login, and project addition in a RESTful API.
// The code sets up a series of API endpoints for user registration, login, and project management.
// Middleware like JWT authentication and file upload handling (via Multer) is applied to certain routes to add security and functionality.

// import express
// This is the primary framework used to create the web server. It simplifies the process of handling HTTP requests and responses.
// Express is used to create a router and define routes that are linked to specific controller functions.
const express = require("express");

// import userController
// This module contains the logic for handling user-related operations. This is imported from the controllers directory.
const userController = require("./controllers/userController");

// import projectController
// This module contains the logic for handling project-related operations. This is imported from the controllers directory.
const projectController = require("./controllers/projectController");

// jwt middleware
// This is middleware used for handling JSON Web Token (JWT) authentication. It ensures that only authenticated users can access certain routes.
const jwt = require("./middleware/jwtMiddleware");

// multer middleware
// This is middleware used for handling file uploads. It's configured to handle a single file upload for a project image, identified by the form field name "projectImg".
const multer = require("./middleware/multerMiddleware");

// create object for router class
// router: This creates a new instance of the Express Router. The router allows you to define routes that can be modularized and used in different parts of the application.
const router = new express.Router();

// register
// Creates Register route
// Path: /register
// Method: POST
// Handler: userController.registerController
// Handles user registration. When a POST request is made to /register, the registerController function in userController is executed.
router.post("/register", userController.registerController);

// login
// Creates Login route
// Path: /login
// Method: POST
// Handler: userController.loginController
// Handles user login. When a POST request is made to /login, the loginController function in userController is executed.
router.post("/login", userController.loginController);

// add project
// Creates Add Project route
// Path: /add-project
// Method: POST
// Middlewares:
  // jwt: Ensures the request is authenticated via a JWT.
  // multer.single("projectImg"): Handles the file upload for a single image file, which should be passed with the form field name "projectImg".
// Allows authenticated users to add a project. The addProjectController function in projectController is executed, processing the uploaded project image along with other project details.
router.post("/add-project", jwt, multer.single("projectImg"), projectController.addProjectController);
// router.post("/add-project", jwt, projectController.addProjectController);

// get home project
router.get("/home-project", projectController.getHomeProjectController);

// get all projects
router.get("/all-project", projectController.getAllProjectController);

// get user projects
router.get("/user-project", jwt, projectController.getUserProjectController);

// delete user projects
router.delete("/remove-user-project/:id", projectController.deleteUserProjectController);

// edit user projects
router.put("/edit-project/:id", jwt, multer.single("projectImg"), projectController.editUserProjectController);

// update profile
router.put("/update-profile", jwt, multer.single("profile"), userController.updateProfileController);

// export module to backend
// Exporting the router
// This line exports the router object, making it available to be imported and used in the main application (index.js file). This allows the routes defined in this file to be integrated into the larger Express application.
// The router is exported so it can be used in the main server file (index.js file), allowing these routes to be part of the API.
module.exports = router;
