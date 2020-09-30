//import libs
const jwt=require("jsonwebtoken");

//import HttpResponse
const HttpResponse=require("../models/http-response");

//export module
module.exports=(req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    }
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            throw Error("Authentication Failed !!");
        }
        const decodedToken=jwt.verify(token,"myToken");
        req.userData={userId:decodedToken.userId};
        next();
    }catch(err){
        const error=new HttpResponse("Authentication Failed",403);
        return res.status(403).json({response:error});
    }
}