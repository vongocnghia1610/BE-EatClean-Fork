const userRouter = require("./user");
const meRouter = require("./me");
const collaboratorRouter = require("./collaborator");
function route(app) {
  app.use("/user", userRouter);
  app.use("/me", meRouter);
  app.use("/collaborator", collaboratorRouter);
}
module.exports = route;
