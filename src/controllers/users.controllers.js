"use strict";
//import important libs
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//import HttpResponse
const HttpResponse=require("../models/http-response");
const { create } = require("../models/user");

//import userSchema
const User=require("../models/user");

//create signup function here
const signup=async(req,res)=>{
    const {img,name,phoneNumber,email,password}=req.body;
    //check user exists or not
    let existinguser;
    try{
        existinguser=await User.findOne({email:email});
    }catch(err){
        const error=new HttpResponse("Error in checking existing user",500);
        return res.status(500).json({response:error});
    }
    //if user exist then throw a error that user exists
    if(existinguser){
        const error=new HttpResponse("User Already Exists",422);
        return res.status(422).json({response:error});
    }
    //if user does not exists then use its password and hash it using bcyptjs
    let hashedPassword;
    try{
        hashedPassword=await bcrypt.hash(password,12);
    }catch(err){
        const error=new HttpResponse("Error in hashing of password",500);
        return res.status(500).json({response:error});
    }
    //After hashing is done lets store the data of user into db.
    const createdUser=new User({
        img,
        name,
        phoneNumber,
        email,
        password:hashedPassword
    });
    try{
        await createdUser.save();
    }catch(err){
        const error=new HttpResponse("Error in saving User",500);
        return res.status(500).json({response:error});
    }
    //Create a toke for user now.
    let token;
    try{
        token=jwt.sign({userId:createdUser.id,email:createdUser.email,userType:createdUser.userType},
            "myToken",
            {expiresIn:'21d'});
    }catch(err){
        const error=new HttpResponse("Error in token generation",500);
        return res.status(500).json({response:error});
    }
    //return response
    res.status(201).json({
        userId:createdUser.id,
        img:createdUser.img,
        name:createdUser.name,
        phoneNumber:createdUser.phoneNumber,
        email:createdUser.email,
        token:token
    })
};

//create login function here
const login=async(req,res)=>{
    const {email,password}=req.body;
    //check if user exists or not
    let existinguser;
    try{
        existinguser=await User.findOne({email:email});
    }catch(err){
        const error=new HttpResponse("Error in checking existing user",500);
        return res.status(500).json({response:error});
    }
    //if user not exist then throw an error that user does not exist.
    if(!existinguser){
        const error=new HttpResponse("User does not exist",401);
        return res.status(401).json({response:error});
    }
    //if user exist that match password
    let isValidPassword;
    try{
        isValidPassword=await bcrypt.compare(password,existinguser.password);
    }catch(err){
        const error=new HttpResponse("Error in matching Password",500);
        return res.status(500).json({response:error});
    }
    //if not valid password then throw error
    if(!isValidPassword){
        const error=new HttpResponse("Credential did not matched",401);
        return res.status(401).json({response:error});
    }
    //As user is valid now generate token
    let token;
    try{
        token=jwt.sign({userId:existinguser.id,email:existinguser.email,userType:existinguser.userType},
            "myToken",
            {expiresin:'21d'});
    }catch(err){
        const error=new HttpResponse("Error in generating token",500);
        return res.status(500).json({response:error});
    }
    //send response
    res.status(200).json({
        userId:existinguser.id,
        img:existinguser.img,
        name:existinguser.name,
        phoneNumber:existinguser.phoneNumber,
        email:existinguser.phoneNumber,
        token:token
    })
};

//export

exports.signup=signup;
exports.login=login;
