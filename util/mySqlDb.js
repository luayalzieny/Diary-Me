const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    'BlogDb',//db name
    'root',//username
    'Mysql_123password',{//password
        dialect:'mysql',
        host:'localhost',//hostname
        //  port:3000
    }
);

module.exports=sequelize;