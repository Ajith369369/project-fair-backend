// import dotenv
require("dotenv").config(); // loads env variable

// import express
const express = require("express");

// import cors
const cors = require("cors");

// import router
const router = require("./routes");

// import MongoDB connection file
require("./connection");

// Not used in this project
// Application-specific Middleware
// const appmiddleware = require("./middleware/appMiddleware");

// create server
const pfServer = express();

// connect server with frontend
pfServer.use(cors());

// parse json format of data received at the server side - json()
pfServer.use(express.json());

// Not used in this project
// Application-specific Middleware
// pfServer.use(appmiddleware);

// router
pfServer.use(router);

// static() is used to export a file/folder from the server-side.
// 1st argument ('/uploads') - The name by which other application (frontend) should use the exported file/folder.
// 2nd argument ('./uploads') - The path of the file/folder which needs to be exported.
// The file could be seen in: "http://localhost:4000/uploads/image-1723704799894-Media Player.png"
pfServer.use('/uploads', express.static('./uploads'))

// set port for the server to run
const PORT = 4000 || process.env.PORT;

pfServer.listen(PORT, () => {
  console.log(`Server running successfully at PORT NUMBER: ${PORT}`);
});

// use nodemon index.js because servers don't have auto-compilation.

// logic
/* pfServer.get("/get", (req, res) => {
  res.send("GET request received.");
});

pfServer.post("/post", (req, res) => {
  res.send("POST request received.");
});

pfServer.put("/put", (req, res) => {
  res.send("PUT request received.");
});

pfServer.delete("/delete", (req, res) => {
  res.send("DELETE request received.");
});
 */
