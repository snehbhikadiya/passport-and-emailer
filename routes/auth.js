const express=require('express');
const routes=express.Router();
const authController=require('../controller/authController');
const {notAuthenticated}=require('../middleware/authorise');
const passport=require('passport');

const use=(fn)=>((req,res,next)=>
{
    Promise.resolve(fn(req,res,next)).catch(next);
})

//-------register-------//
routes.get('/register',notAuthenticated,use(authController.getregister));
routes.post('/register',notAuthenticated,use(authController.register));

//------login-------//
routes.get('/login',notAuthenticated,use(authController.getlogin));
routes.post('/login',notAuthenticated,passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash:false
}));


//------forget------//
routes.get('/forget',notAuthenticated,use(authController.getforget));
routes.post('/forget',notAuthenticated,use(authController.foeget));


//----reset-----//
routes.get('/reset',notAuthenticated,use(authController.getreset));
routes.post('/reset',notAuthenticated,use(authController.reset));





module.exports=routes