const projects = require("../model/projectModel");

exports.addProjectController = async (req, res) => {
  console.log("Inside addProjectController.");
  // console.log('req: ', req)
  // res.status(200).json("addProjectController received the request.");

  // Look for payload coming from jwtMiddleware.js
  const userId = req.payload;
  console.log("userId from payload coming from jwtMiddleware.js: ", userId);

  const { title, language, github, website, overview } = req.body;
  console.log(title, language, github, website, overview);

  console.log("req.file: ", req.file);
  const projectimage = req.file.filename;
  console.log("projectimage: ", projectimage);
  // res.status(200).json("Request received.");
  try {
    const existingProject = await projects.findOne({ github });

    if (existingProject) {
      res.status(406).json("Project already exists.");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        website,
        overview, // model_variable_name == frontend_variable_name
        projectImage: projectimage, // model_variable_name: frontend_variable_name
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// get all projects
exports.getAllProjectController = async (req, res) => {
  // body - req.body
  // path - req.params
  // query - req.query
  const searchKey = req.query.search;
  console.log("searchKey: ", searchKey);

  const query = {
    language: {
      $regex: searchKey,
      $options: "i",
    },
  };

  try {
    const allProject = await projects.find(query);
    res.status(200).json(allProject);
  } catch (error) {
    res.status(401).json(error);
  }
};

// get home projects
exports.getHomeProjectController = async (req, res) => {
  try {
    // Limit results to 3
    const homeProject = await projects.find().limit(3);
    res.status(200).json(homeProject);
  } catch (error) {
    res.status(401).json(error);
  }
};

// get user project
exports.getUserProjectController = async (req, res) => {
  const userId = req.payload;
  try {
    const userProject = await projects.find({ userId });
    res.status(200).json(userProject);
  } catch (error) {
    res.status(401).json(error);
  }
};

// delete user project
exports.deleteUserProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await projects.findByIdAndDelete({ _id: id });
    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(401).json(error);
  }
};

// edit user project
exports.editUserProjectController = async (req, res) => {
  console.log("Inside editProject controller.");
  
  const { title, language, github, website, overview, projectImg } = req.body;
  console.log(title, language, github, website, overview, projectImg);

  const projectimage = req.file ? req.file.filename : projectImg;
  console.log("projectimage: ", projectimage);

  const { id } = req.params;
  console.log("id: ", id);

  const userId = req.payload;
  console.log(userId);
  
  try {
    const existingProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        github,
        website,
        overview,
        projectImage: projectimage,
        userId,
      },
      { new: true }
    );
    console.log(existingProject);
    
    await existingProject.save();
    res.status(200).json(existingProject);
  } catch (error) {
    res.status(401).json(error);
  }
};

// update profile
exports.updateProfileController = async (req, res) => {
  console.log("Inside updateProfile controller.");
  
  const userId = req.payload;
  console.log(userId);

  const { username, email, password, github, linkedin, profile } = req.body;
  console.log(username, email, password, github, linkedin, profile);

  const profileImg = req.file ? req.file.filename : profile;
  console.log("profileImg: ", profileImg);

  try {
    const existingProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        github,
        website,
        overview,
        projectImage: projectimage,
        userId,
      },
      { new: true }
    );
    console.log(existingProject);
    
    await existingProject.save();
    res.status(200).json(existingProject);
  } catch (error) {
    res.status(401).json(error);
  }
};
