//import important libs
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

//import Routes
const userRoute=require("./src/routes/user.routes");
const blogRoute=require("./src/routes/blog.routes");

//create server
const app=express();

//use these with app
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

//setHeaders
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE");
    next();
});

//use routes
app.use("/api/user",userRoute);
app.use("/api/blog",blogRoute);

//define dbURL
const dbURL="mongodb+srv://himanshu2515:6350515122aA@@cluster0.z31eg.mongodb.net/blogsDB?retryWrites=true&w=majority";

//connect to mongoose
mongoose
    .connect(dbURL,{useUnifiedTopology:true,useNewUrlParser:true,
        useCreateIndex:true,useFindAndModify:true})
    .then(()=>{
        console.log("Connected to server || Server has Started");
        app.listen(process.env.PORT || 5000);
    })
    .catch(err=>{
        console.log(err);
    });