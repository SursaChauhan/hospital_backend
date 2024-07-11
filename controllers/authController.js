const User =require('../models/authModel.js');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

exports.register = async(req,res)=>{
    try{
const {name,email,password} =req.body;
console.log(name,email,password);

const ifExist = await User.findOne({ email });
if (ifExist) {
    return res
        .status(406)
        .json({ message: "User Already Exist" });
}

const hashedpassword = await bcrypt.hash(password,10);
const user = await User.create({name,email,password:hashedpassword});

res.status(201).json({msg:"User Registerd Successfully",user});
    }catch(error){
        res.status(500).json(error);
    }
}


//login 
exports.login = async(req,res)=>{
    try{
const {email,password} =req.body;
console.log(email,password);
const user = await User.findOne({email});

if(!user){return res.status.json({msg:"Account not found"})};
console.log(user);
const isValidPassword = await bcrypt.compare(password,user.password);

if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
}

const token = jwt.sign({user:user._id},process.env.JWT,{expiresIn:'1h'});

res.status(200).json({token,user,msg:"User Logged In Successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
