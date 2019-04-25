const Department = require('../models/department');

//Вывод таблицы
exports.selectAll = function () {
    return Department.findAll({raw: true}).then(
        (result) => {
            return result;
        }
    )
};
//Добавление департамента
exports.addDepartment = function (name, parentId, inn) {
    return Department.create({
        name: name,
        parentid: (parentId == "") ? null : parentId,
        inn: inn
    }).then(data => {
        return data
    });
};
//Удаление департамента
exports.deleteDepartment = function (id) {
    return Department.destroy({
        where: {
            id: id
        }
    }).then(() => {
        console.log("DONE SUCCESS");
        return 204;
    }).catch(function (error) {
        console.log(`ERROR: ${error}`);
        return 403;
    });
};
//Редактирование работяги
exports.editDepartment = function (id, name, parentId, inn) {
    return Department.update({
        parentid: (parentId == "") ? null : parentId,
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
    return Department.findByPk(departmentId, {raw: true}).then(
        (result) => {
            return result;
        }
    )
};