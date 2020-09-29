//import important libs
const express=require("express");

//import checkToken
const checkToken=require("../middlewares/checkToken");

//import blogController
const blogController=require("../controllers/blogs.controllers");

//create a route
const router=express.Router();

//use checkToken so that routes below it needs token, without token it won't work
router.use(checkToken);

//define route for creating a blog
router.post("/create",blogController.createBlog);

//define route for getting all blogs
router.get("/getAll",blogController.getAllBlogs);

//export router
module.exports=router;