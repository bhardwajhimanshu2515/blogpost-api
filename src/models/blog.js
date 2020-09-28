//import important libraries
const mongoose=require("mongoose");

//import userSchema
const {schema}=require("./user");

const Schema=mongoose.Schema;

//create blogSchema
const blogSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    img:{type:String,required:true},
    ownerId:{type:Schema.Types.ObjectId,ref:'User'},
    createdBy:{type:Schema.Types.ObjectId,ref:'User'},
    updatedBy:{type:Schema.Types.ObjectId,ref:'User'}
},
{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}}
);

//export
module.exports=mongoose.model('Blog',blogSchema);