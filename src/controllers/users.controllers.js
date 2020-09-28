"use strict";
//import important libs
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//import HttpResponse
const HttpResponse=require("../models/http-response");

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
};