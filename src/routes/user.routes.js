//import important libs
const express=require("express");
const {check}=require("express-validator");

//import userController
const userController=require("../controllers/users.controllers");

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

