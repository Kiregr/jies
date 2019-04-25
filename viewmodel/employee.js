const Employee = require('../models/employee');

//Вывод таблицы
exports.selectAll = function () {
    return Employee.findAll({raw: true}).then(
        (result) => {
            return result;
        }
    )
};
//Добавление работяги
exports.addEmployee = function (name, departmentId) {
    return Employee.create({
        fullname: name,
        departmentid: departmentId
    });
};
//Удаление работяги
exports.deleteEmployee = function (id) {
    return Employee.destroy({
        where: {
            id: id
        }
    });
};
//Редактирование работяги
exports.editEmployee = function (id, name, departmentId) {
    return Employee.update({
        departmentid: departmentId,
        fullname: name,
    }, {
        where: {
            id: id
        }
    });
};
//Поиск всех работяг из указанного департамента
exports.findEmployeesFromDepartment = function (departmentId) {
    return Employee.findAll({where: {DepartmentId: departmentId}, raw: true}).then(
        (result) => {
            return result;
        }
    )
};
//Поиск работяги по Id
exports.findEmployee = function (employeeId) {
    return Employee.findByPk(employeeId, {raw: true}).then(
        (result) => {
            return result;
        }
    )
};