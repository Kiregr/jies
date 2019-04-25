const Department = require('../models/department');

//Вывод таблицы
exports.selectAll = function () {
    return Department.findAll({ raw:true }).then(
        (result)=>{
            return result;
        }
    )
};
//Добавление департамента
exports.addDepartment = function(name, parentId, inn) {
    return Department.create({
        name: name,
        parentid: (parentId=="") ? null : parentId,
        inn: inn
    }).then(data => {return data});
};
//Удаление департамента
exports.deleteDepartment = function (id) {
    return Department.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        console.log("DONE SUCCESS");
        return 204;
    }).catch(function(error){
        console.log(`ERROR: ${error}`);
        return 403;
    });
};
//Редактирование работяги
exports.editDepartment = function (id, name, parentId, inn) {
    return Department.update({
        parentid: (parentId=="") ? null : parentId,
        name: name,
        inn: inn
    }, {
        where: {
            id: id
        }
    });
};

//Поиск департамента по Id
exports.findDepartment = function (departmentId) {
    return Department.findByPk(departmentId, {raw:true }).then(
        (result)=>{
            return result;
        }
    )
};

//опять работа
//const Sequelize = require('sequelize');
//const sequelize = require('../common/sqlite');
/*
source: [
                        {title: "Node 1", key: "1", children:[]},
                        {title: "Folder 2", key: "2", children: [
                                {title: "Node 2.1", key: "3"},
                                {title: "Node 2.2", key: "4"}
                            ]
                        }
                    ],
 */

// Find all users
//Department.findAll({ raw:true }).then(users => {
//    console.log(users);
//});
/*
sequelize.query("SELECT Name as name, Id as key, (SELECT Id FROM Employees where id = 1) as children FROM Departments where Id = 1 ", { type: sequelize.QueryTypes.SELECT})
    .then(departments=> {
        console.log(departments);
    });
*/
/*
ex = function () {
    Department.findAll({ raw:true }).then(
        (result)=>{
            console.log(result);
        }
    )
};

ex();
 */