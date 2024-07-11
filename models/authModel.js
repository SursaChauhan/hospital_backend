const mongoose =require('mongoose');

const registerSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
const User = mongoose.model('Register',registerSchema);
module.exports =User;