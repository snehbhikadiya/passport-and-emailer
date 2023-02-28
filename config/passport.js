const LocalStratgy=require('passport-local').Strategy;
const passport=require('passport');
const User=require('../model/registerModel');


module.exports=async(req,res)=>
{
    
    passport.serializeUser((user,done)=>
    {
        console.log(user);
        if(user)
        {
            return done(null,user._id);
        }
        const err=new Error('not find user');
        return done(err);
    })

    passport.deserializeUser((id,done)=>
    {
        User.findById(id,(err,user)=>
        {
            if(err)
            {
                return done(null,false);
            }
            return done(null,user)
        })
       
    })


    passport.use(new LocalStratgy({usernameField:'email'},
    async function(name,password,done)
    {
        User.findOne({email:name},function(err,user)
        {
            if(err)
            {
               const err=new Error('err from passport')
               return done(err)
            }
            if(!user)
            {
                return done(null,false,{type:"error",message:"incorect username"})
            }
            if(user.password!==password)
            {
                return done(null,false,{type:"error",message:"incorect password"})
            }
            return done(null,user)
        })
    }
    ))
}