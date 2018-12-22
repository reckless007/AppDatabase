const Sequelize = require('sequelize');
const DB = require('../config/database');


const Gig = DB.define('gig',{
    Title:{
        type : Sequelize.STRING
    },
    Subject:{
        type : Sequelize.STRING
    },
    Budget:{
        type : Sequelize.STRING
    },
});
module.exports = Gig;
