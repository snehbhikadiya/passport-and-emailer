const mongoose=require('mongoose');
const Schema=mongoose.Schema

const register=new Schema({
    name:String,
    email:String,
    password:String,
    phoneNo:String
})


const registerModel=mongoose.model('register',register);

module.exports=registerModel