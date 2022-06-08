// required modules
const bcrypt=require('bcrypt')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const User=require('../db/modelMongo')
const User=require('./../db/user')
const Blog=require('./../db/blog')
//end of required modules

const customFields={
  usernameField:"email",
  passwordField:"password"
}

//authorization
//sequelize passport authorization
passport.use(new LocalStrategy(customFields, (email,password,done)=>{
  User.findOne( {where:{email:email}})
    .then((user)=>{
        if (!user) {
        return done(null, false, { message: "Email doesn't exist" });
    }

    bcrypt.compare(password,user.password,(err,res)=>{
      if(res){
          return  done(null,user)
      }else{
          return done(null,false,{message:"Password incorrect"})
      }

    })

  })
    .catch(err=>console.log(err))
}))

// passport.use(new LocalStrategy(customFields, (email,password,done)=>{
//   User.findOne({email}, (err,user)=>{
//     if (err) { 
//       return done(err);
//     };
    
//     if (!user) {
//       return done(null, false, { message: "Email doesn't exist" });
//     }

//     bcrypt.compare(password,user.password,(err,res)=>{
//       if(res){
//         return  done(null,user)
//       }else{
//         return done(null,false,{message:"Password incorrect"})
//       }

//     })

//   })
// }))

//end of authorization


//passport cookie

  
passport.serializeUser((user, done)=>done(null, user.id)
);
passport.deserializeUser((id, done)=> {

  User.findByPk(id).then(function(user) {
 
    if (user) {

      return  done(null, user);

    } else {

      return  done(user.errors, null);

    }

});

  // User.findByPk(_id)
  //   .then(user=>{
     
  //     return done(user)
  //     })
  //   .catch(err=>console.log(err))

})

// User.findByPk({_id},function(err,user){
//   if(err){
//     console.log(err.message)
//   }
  
//   return done(err,user)

// })

// });
//end ofpassport cookie





//handle errors
const handleErrors=(err,numb)=>{
 // console.log(err.message,err.code)
  let errors ={username:"",email:"",number:"",password:""}
  
  //duplicate error
  
  if(err.code===11000){
    errors.username=JSON.stringify(Object.values(err.keyValue)[0]).slice(1,-1)+" already exists"
    console.log(err)
    return errors
  }
  
  if(numb[0]!=="0" && numb[1]!=="1"){
  
   errors.number="Enter a valid number"
  }

  // validation errors
  if(err.message.includes("blog validation failed")){
    Object.values(err.errors).forEach((error)=>{

     errors[error.properties.path]=error.properties.message
      //console.log(error.properties.message)
    
    })
  }
return errors;
}



//end of handle errors


//end of basic functions

//routes
exports.get_home= (req,res)=>{
  console.log(req.user)
    res.render("home", { user: req.user });
  
}

exports.get_about_us=(req,res)=>{
    res.render('about_us', { user: req.user })
}



exports.get_signup=(req,res)=>{
  // checkAuthentication(req,res)

  res.render('signup', { user: req.user,err:"", })
}

exports.post_signup=(req,res)=>{
  let password=req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    
    // Store hash in your password DB.
    password=hash
    User.create({
      username:req.body.username,
      email:req.body.email,
      number:req.body.number,
      password:password
    })
    .then( (result)=>{
     console.log("user",result);
        return res.redirect("/")
      
    })
    .catch(err=>console.log(err));

});
  
  //   user.save((err)=>{
  //     if(err){
  //        const error=handleErrors(err,req.body.number)
  //  //res.status(400).json(error)
  //        res.render("signup", { user: req.user,err:error })

  //     }else{
  //       res.redirect("/")
  //       }
  
  //     });
}

exports.get_signin=(req,res)=>{

  res.render("signin", { user: req.user })
}

exports.get_post=(req,res)=>{
  res.render('post', { user: req.user })
    
}

exports.post_post=(req,res)=>{
  var user= req.user.email
  var title=req.body.title
  var text=req.body.text
  const post={title,text}

  req.user.createBlog({title:title,post:text})
    .then(result=>{
      console.log(result)
      res.redirect('/')
    })
    .catch(err=>console.log(err));
// User.updateOne({email:user},{$push: {"blog":post}},function(err){
//     console.log(err)
//     });
  

}


exports.get_myblog=(req,res)=>{
  req.user.getBlogs(req.user.id)
    .then(result=>{
      console.log(result.length)
      res.render("myblog", { user: req.user,blog:result })

    })
    .catch(err=>console.log(err));

}

exports.delete_post=(req,res)=>{
  const post=req.params.prodId;
  console.log(post)
  Blog.findByPk(post)
    .then(post=>{
      if(!post){
        return next(new Error('product not found'))
      }
      return post.destroy();
    })
    .then(result=>{
      console.log('DESTROYED PRODUCT');
      res.status(200).json({
        message:'success'
      });
    })
    .catch(err=>{
      res.status(400).json({
        message:'deletion failed'
      })
    });
};


