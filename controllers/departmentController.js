const departmentViewmodel = require('../viewmodel/department');
const getParents = require('../common/get-parents');

//Вывод таблицы с департаментами
exports.showTable = function (request, response) {
    departmentViewmodel.selectAll().then((data) => {
        response.render("departments", {departments: data});
    })
};

//Добавление департамента
exports.addDepartmentGet = function (request, response) {
    let departments;

    departmentViewmodel.selectAll()
        .then((data) => {
            departments = data;
            response.render("add_departments", {departments: departments});
        });
};
exports.addDepartmentPost = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let departmentName = request.body.name;
    let departmentParentId = request.body.parentId;
    let departmentInn = request.body.inn;

    departmentViewmodel.addDepartment(departmentName, departmentParentId, departmentInn)
        .then(() => {
            response.sendStatus(200);
        });
};

//ДОБАВЛЕНИЕ ДЛЯ DROP-DOWN
//поиск возможных родителей указанного департамента
exports.getParents = function (request, response) {
    let departmentId = request.params.id;

    departmentViewmodel.selectAll()
        .then((data) => {
            response.send(getParents.findParents(data, departmentId));
        });
};
exports.addDepartmentGetDropDown = function (request, response) {
    let departments;

    departmentViewmodel.selectAll()
        .then((data) => {
            departments = data;
            response.render("drop_down", {departments: departments});
        });
};
exports.addDepartmentPostDropDown = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let departmentName = request.body.name;
    let departmentParentId = request.body.parentid;
    let departmentInn = request.body.inn;
    let departmentId = request.body.id;

    response.end(`Name: ${departmentName}; Parent: ${departmentParentId}; Inn ${departmentInn}; DepId: ${departmentId}`)
};
//Удаление департамента
exports.deleteDepartment = function (request, response) {
    let departmentId = request.params.id;

    departmentViewmodel.deleteDepartment(departmentId)
        .then((status) => {
            response.sendStatus(status)
        });
    //response.redirect("/tree");

};

//Редактирование департамент
exports.editDepartmentGet = function (request, response) {
    let departmentId = request.query.id;
    let departmentParentId = request.query.parentId;
    let departmentName = request.query.name;
    let departmentInn = request.query.inn;
    let parents;

    departmentViewmodel.selectAll()
        .then((data) => {
            parents = getParents.findParents(data, departmentId);
            response.render("edit_departments", {
                parents: parents,
                id: departmentId,
                name: departmentName,
                parentId: departmentParentId,
                inn: departmentInn
            });
        });
    console.log("editDepartmentGet");
};
exports.editDepartmentPost = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let departmentId = request.body.id;
    let departmentParentId = request.body.parentId;
    let departmentName = request.body.name;
    let departmentInn = request.body.inn;

    departmentViewmodel.editDepartment(departmentId, departmentName, departmentParentId, departmentInn)
        .then(response.sendStatus(200));
};

//Редактирование департамента по его id
exports.editDepartmentViaIdGet = function (request, response) {
    let departmentId = request.params.id;
    departmentViewmodel.findDepartment(departmentId).then((data) => {
        response.send(data);
    });
};

