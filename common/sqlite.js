const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'C:/sqlite/databases/tree_test.db'
});

module.exports = sequelize;