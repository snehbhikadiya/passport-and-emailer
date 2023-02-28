require('dotenv').config();
require('./config/db');
const express=require('express');
const app=express();
const routes=require('./routes/index');
const path=require('path');
const session=require('express-session');
const mongostore=require('connect-mongo');
const passport=require('passport');
const flash=require('connect-flash');

require('./config/passport')(passport);
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false,limit:'57mb'}));
app.use(express.json({limit:'750mb'}));
const Mongostore=mongostore.create({
    mongoUrl:process.env.MONGO_URL,
    ttl:3000*54*45,
    crypto:process.env.MONGO_URL
})
app.use(session({
    secret:process.env.SECREAT,
    resave:false,
    saveUninitialized:false,
    store:Mongostore,
    cookie:{secure:false,sameSite:true,maxAge:6954*5*4}
}))



app.use(passport.initialize());
app.use(passport.session()); 
// app.use(flash());
app.use(routes);
app.use((err,req,res,next)=>
{
    const message=err.message
    const status=err.statusCode||500
    res.status(status).json({
        message
    })
})


app.listen(3000,()=>
{
    console.log('server start on 3000');
})