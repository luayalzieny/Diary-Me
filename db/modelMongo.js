const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator = require('validator');
//mongodb://localhost:27017/passportDB
mongoose.connect("mongodb+srv://BlogDB:blogdb@cluster0.y0j95.mongodb.net/Blogdb?retryWrites=true&w=majority",{
    useNewUrlParser:true ,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})


const blogSchema=new mongoose.Schema({
    username:{type:String,
        index: { unique: [true,"Username already exists"]},
        required:[true,"Please enter username"],
        max:[30,"Username should be less than 30 characters"]},
        
    email:{type:String,
        index: { unique: [true,"Email already exists"]},
        required:[true,"Email required"],
        validate:[validator.isEmail,"Please enter a valid email"]},
    
    number:{type:String,
        required:[true,"Please enter your number"],
        index: { unique: true},
        minlength:[11,"Length of numbers is 11 "], 
        maxlength:[11,"Length of numbers is 11 "]
    
    },
    
    password:{type:String,
        required:[true,"Please enter a password"],
        minlength:[3,"Minimum password length is 3 characters"]
    } ,
    
    blog:[{
        title:{type:String,default:"title"},
        text:{type:String ,default:"text"}
    }]
})




blogSchema.pre('save',async function(next){
this.password=await bcrypt.hash(this.password,10)
next()
})



const blog= mongoose.model("blog",blogSchema)

//exports.post=mongoose.model("post",postSchema)
module.exports=blog