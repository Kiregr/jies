const department_viewmodel = require('../viewmodel/department');

//Вывод таблицы с департаментами
exports.showTable = function (request, response) {
    department_viewmodel.selectAll().
    then((data)=>{
        console.log(data);
        console.log(data.length);
        console.log(data[0]);
        response.render("departments", {departments: data});
    })
};

//Добавление департамента
exports.addDepartmentGet = function (request, response) {
    let departments;
    department_viewmodel.selectAll().
    then((data)=>{
        departments = data;
        response.render("add_departments", {departments: departments});
    });

};  
exports.addDepartmentPost = function(request, response){
    if(!request.body) return response.sendStatus(400);
    let department_name = request.body.name;
    let department_parentId = request.body.parentId;
    let department_inn = request.body.inn;
    department_viewmodel.addDepartment(department_name, department_parentId, department_inn).then((data) => {
        response.sendStatus(200);
    });
    //response.redirect("/Departments");
    //response.sendStatus(200);

};

//ДОБАВЛЕНИЕ ДЛЯ DROP-DOWN
//поиск возможных родителей указанного департамента
const getParents = require('../common/get-parents');
exports.getParents = function (request, response) {
    let department_id = request.params.id;
    console.log(department_id);
    department_viewmodel.selectAll().
    then((data)=>{
        //console.log(data);
        //console.log(getParents.findParents(data, department_id));
        //let tree = getParents.findParents(data, department_id);
        response.send(getParents.findParents(data, department_id));
    });
};
exports.addDepartmentGetDropDown = function (request, response) {
    let departments;
    department_viewmodel.selectAll().
    then((data)=>{
        departments = data;
        response.render("drop_down", {departments: departments});
    });
    //response.render("drop_down", {parents: [{Id:2, Name: "HAHA"},{Id:1, Name:"ODIN"}], Id: department_id});
};
exports.addDepartmentPostDropDown = function(request, response){
    if(!request.body) return response.sendStatus(400);
    let department_name = request.body.name;
    let department_parentId = request.body.parentid;
    let department_inn = request.body.inn;
    let department_id = request.body.id;

    response.end(`Name: ${department_name}; Parent: ${department_parentId}; Inn ${department_inn}; DepId: ${department_id}`)
    //response.redirect("/Departments");
    //response.sendStatus(200);

};
//Удаление департамента
exports.deleteDepartment = function(request, response){
    let department_id = request.params.id;
    //let department_id = request.params.id;
    department_viewmodel.deleteDepartment(department_id).
    then((status)=> response.sendStatus(status));
    //response.redirect("/tree");

};

//Редактирование департамент
exports.editDepartmentGet = function(request, response){
    let department_id = request.query.id;
    let department_parentId = request.query.parentId;
    let department_name = request.query.name;
    let department_inn = request.query.inn;
    let parents;
    department_viewmodel.selectAll().
    then((data)=>{
        parents = getParents.findParents(data, department_id);
        response.render("edit_departments", {parents: parents, id: department_id, name: department_name, parentId: department_parentId, inn: department_inn});
    });
    console.log("editDepartmentGet");
};
exports.editDepartmentPost = function(request, response, next){
    if(!request.body) return response.sendStatus(400);
    let department_id = request.body.id;
    let department_parentId = request.body.parentId;
    let department_name = request.body.name;
    let department_inn = request.body.inn;
    console.log(`${department_parentId}`);
    department_viewmodel.editDepartment(department_id,department_name,department_parentId,department_inn);
    //response.redirect("/Departments");
    response.sendStatus(200);
};

//Редактирование департамента по его id
exports.editDepartmentViaIdGet = function (request, response) {
    let department_id = request.params.id;
    //console.log(department_id);
    department_viewmodel.findDepartment(department_id).
    then((data)=>{
        //console.log(data);
        response.send(data);
    });
};

