//import important libraries
const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

const Schema=mongoose.Schema;

//create userSchema
const userSchema=new Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    isActive:{type:Boolean,default:true}
});

//plugin uniqueValidator to userSchema
userSchema.plugin(uniqueValidator);

//export
module.exports=mongoose.model('User',userSchema);