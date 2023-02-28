const User=require('../model/registerModel');
const jwt=require('jsonwebtoken');
const mailer=require('nodemailer');


exports.getregister=async(req,res)=>
{
    res.render('register');
}

exports.register=async(req,res)=>
{
    const{name,email,password,phoneNo}=req.body
    const user={
        name,email,password,phoneNo
    }
    const register=await User.create(user);
    
    res.redirect('/login');
}

exports.getlogin=async(req,res)=>
{
    res.render('login');
}

exports.login=async(req,res)=>
{
    const {email,password}=req.body
    const findemail=await User.findOne({email});
    if(!findemail)
    {
        return res.redirect('/register');
    }
    if(findemail.password!==password)
    {
        return res.redirect('/login');
    }
    req.session.userId=findemail.id
    return res.redirect('/dashboard');
}


const emailcompny=process.env.EMAIL
const passwordcompny=process.env.EMAIL_PASSWORD

let transpoter=mailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:emailcompny,
        pass:passwordcompny
    }

})  

exports.getforget=async(req,res)=>
{
    res.render('forget');
}


exports.foeget=async(req,res)=>
{
    const {email}=req.body
    const findemail=await User.findOne({email});
    if(!findemail)
    {
        return res.redirect('/login');
    }      
    const payload={
        id:findemail.id,
        
    }
    const token=await jwt.sign(payload,process.env.SECREAT,{
        expiresIn:'24h'
    });

   let info=await transpoter.sendMail({
    from:`sneh bhikadiya${emailcompny}`,
    to:email,   
    subject:"reset password",
    html:`<a href="http://localhost:3000/reset?token=${token}">like to reset password</a>`
   
   })
  
   console.log(info);
    return res.redirect('/login');
}


exports.getreset=async(req,res)=>
{
    const token=req.query.token
    res.render('reset',{token});
}

exports.reset=async(req,res,next)=>
{
    const {password,confirmpassword,token}=req.body
    if(!token||!password||!confirmpassword)
    {
        console.log('not find');
        return res.redirect('/login');
        
    }
    const decode=await jwt.verify(token,process.env.SECREAT);
    const {id}=decode

    const findid=await User.findById(id);
    if(!findid)
    {
        return res.redirect('/register');
    }
    findid.password=password
    await findid.save();
    return res.redirect('/login');
}


