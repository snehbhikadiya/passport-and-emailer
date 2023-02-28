const User=require('../model/registerModel');

exports.authorise=async(req,res,next)=>
{
    // const {userId}=req.body
    // if(!userId)
    // {
    //     return res.redirect('/login');
    // }
    // const finduserid=await User.find({userId});
    // if(!finduserid)
    // {
    //     return res.redirect('/register');
    // }
    // req.session.findemail=finduserid

    // next();

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}


exports.notAuthenticated=async(req,res,next)=>
{
    if(!req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/dashboard');
}