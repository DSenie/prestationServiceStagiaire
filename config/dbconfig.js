const Sequelize = require('sequelize');
// Database configuration
const dbconfig = new Sequelize(
    'test_db',
    'root',
    'nerowinona433', {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306
    }
);



/*connection.connect(function (error) {
    if (error) {
        throw error
    } else {
        console.log("Connected")
    }
});*/

module.exports = dbconfig ;