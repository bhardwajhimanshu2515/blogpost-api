//import blogSchema
const Blog=require("../models/blog");

//import HttpResponse
const HttpResponse=require("../models/http-response");

//define createBlog function here
const createBlog=async(req,res)=>{
    const{title,description,img,ownerId}=req.body;
    const createNewBlog=new Blog({
        title,
        description,
        img,
        ownerId,
        createdBy:ownerId,
        updatedBy:ownerId
    });
    //save it now in db.
    try{
        await createNewBlog.save();
    }catch(err){
        const error=new HttpResponse("Error in saving New Blog in DB",500);
        return res.status(500).json({response:error});
    }
    //return response
    res.status(201).json(createNewBlog);
};

//define getAllBlogs function
const getAllBlogs=async(req,res)=>{
    //find all blogs
    let fetchedBlogs;
    try{
        fetchedBlogs=await Blog.find({});
    }catch(err){
        const error=new HttpResponse("Error in finding all blogs",500);
        return res.status(500).json({response:error});
    }
    //send response
    res.status(201).json(fetchedBlogs);
};

//export functions

exports.createBlog=createBlog;
exports.getAllBlogs=getAllBlogs;