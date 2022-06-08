const express=require('express')
const app=express()
const controller=require('./../controller/controller')
const session = require("express-session");
const passport = require("passport");
const flash = require('express-flash')

app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: false ,
  cookie: { maxAge: 6000000 }

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// basic functions
function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
  return  res.redirect('/')
}
next();

}

function checkNotAuthentication(req,res,next){
  if(!req.isAuthenticated()){
    return res.redirect('/')
    
  }
  next();
  }

app.get('/',controller.get_home)

app.get('/about_us',controller.get_about_us)

app.get('/post',controller.get_post)
app.post('/post',controller.post_post)



app.get('/myblog',checkNotAuthentication,controller.get_myblog)
app.delete('/deletePost/:prodId',checkNotAuthentication,controller.delete_post)

app.get('/signup',checkAuthentication,controller.get_signup)
app.post('/signup',controller.post_signup)

app.get('/signin',checkAuthentication,controller.get_signin)

// app.post('/signin', function(req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
        
//         console.log(req.body)
//     })(req, res, next);
//      });

app.post('/signin', function(req, res, next) {
  passport.authenticate("local",{
      successRedirect:"/",
      failureRedirect:'/signin',
      failureFlash:true
     })(req, res, next);
  
});


app.post('/logout',(req,res)=>{
    req.logOut();
    res.redirect("/")
})





module.exports=app