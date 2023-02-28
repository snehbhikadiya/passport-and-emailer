exports.dashboard=async(req,res)=>
{
    res.render('dashboard');
}


exports.logout=async(req,res)=>
{
    req.session.destroy();  

    res.redirect('/login')
}