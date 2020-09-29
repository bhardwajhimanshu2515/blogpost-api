//import important libs
const express=require("express");
const {check}=require("express-validator");

//import checkToken too
const checkToken=require("../middlewares/checkToken");

//import userController
const userController=require("../controllers/users.controllers");
const user = require("../models/user");

//crate a router
const router=express.Router();

//route for signup
router.post("/signup",
[
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password')
    .isLength({min:6})
],
userController.signup
);

//route for login
router.post("/login",userController.login);

//export router
module.exports=router;

