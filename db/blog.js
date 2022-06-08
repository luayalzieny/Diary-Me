const Sequelize=require('sequelize');

const sequelize=require('./../util/mySqlDb');

const post=sequelize.define('blog',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        // allowNull:false,
    },
    post:{
        type:Sequelize.STRING,
        // allowNull:false,
    },
    // userId : {type: Sequelize.INTEGER},
});

module.exports=post;