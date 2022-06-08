const express = require('express');
const app = express();
const router = require('./routes/routes');
const User = require('./db/user');
const Blog = require('./db/blog');
const sequelize = require('./util/mySqlDb');


app.use(express.urlencoded({extended:"true"}))
app.use(express.json());
app.use(express.static(__dirname))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// app.use((req,res,next)=>{
//     User.findByPk(4)
//     .then(result=>{
//         req.user=result
//          console.log(req.user)

//         next();
//     })
//     .catch(err=>console.log(err))
// })

app.use(router)

Blog.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Blog);

sequelize.sync()
// sequelize.sync({force:true})
    .then(result=>{
        app.listen(3000,function(){
            console.log('Servers up')
        })
    })
    .catch(err=>{console.log(err)})


