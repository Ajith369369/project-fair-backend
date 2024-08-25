// Application-Specific Middleware is not used/required in this project.

const appMiddleware = (req, res, next) => {
  console.log("Inside Application-specific Middleware.");

  // This gives controllers to the next component in the req-res cycle.
  // If this line is commented, the control doesn't go to loginController in userController.js
  next(); 
};

module.exports = appMiddleware;
