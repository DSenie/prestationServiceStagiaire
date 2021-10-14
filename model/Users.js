const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');

// Table -- model name User
const User = dbconfig.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    first_nameIng: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_nameIng: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    struc_benef: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    first_nameRes: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_nameRes: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Type_Travail: {
        type: Sequelize.STRING,
    },
    Type_Ressource: {
        type: Sequelize.STRING,
    },
    depl_Info: {
        type: Sequelize.STRING,
    },
    nbr_Dep: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}); 

module.exports = User;
