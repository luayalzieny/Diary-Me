const Sequelize=require('sequelize');
const sequelize=require('../util/mySqlDb');


//Schema Creation
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },    
    
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    
})

// User.pre('save',async function(next){
//     this.password=await bcrypt.hash(this.password,10)
//     next()
//     })

module.exports=User;