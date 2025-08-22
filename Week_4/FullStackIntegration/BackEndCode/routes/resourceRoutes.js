const express = require("express");
const { addResource, deleteResource, getAllResources } = require("../controllers/resourceControllers");
const { authMid } = require("../middlewares/authMiddle");
const resourceRouter = express.Router();
resourceRouter.get("/getAll", authMid(["user","admin","moderator"]), getAllResources);
resourceRouter.post("/addResource",authMid(["user","admin","moderator"]), addResource);
resourceRouter.delete("/deleteResource/:id",authMid(["user","admin","moderator"]),deleteResource);
module.exports = resourceRouter;