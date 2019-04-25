const Sequelize = require('sequelize');
const sequelize = require('../common/sqlite');

let Department = require('./department');

const Employee = sequelize.define('employee', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    departmentid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        },
    },
    fullname: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
        underscored: true,
        timestamps: false,
        createAt: false,
        paranoid: true
    }
);

module.exports = Employee;