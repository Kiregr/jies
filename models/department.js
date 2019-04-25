const Sequelize = require('sequelize');
const sequelize = require('../common/sqlite');

const Department = sequelize.define('department', {
    // attribute
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    parentid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            key: 'id'
        },
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    inn: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
},{
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
    }
);

module.exports = Department;