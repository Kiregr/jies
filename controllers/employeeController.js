const employee_viewmodel = require('../viewmodel/employee');
const department_viewmodel = require('../viewmodel/department');

//Вывод таблицы с работягами
exports.showTable = function (request, response){
    employee_viewmodel.selectAll().
    then((data)=>{
        response.render("employees", {employees: data});
    })
};

//Добавление работяги
exports.addEmployeeGet = function (request, response){
    let department_id = request.params.departmentId;
    console.log("IM HERE");
    response.render("add_employees",{ departmentId: department_id});
};
exports.addEmployeePost = function(request, response){
    if(!request.body) return response.sendStatus(400);
    let employee_name = request.body.name;
    let employee_depId = request.body.departmentId;
    employee_viewmodel.addEmployee(employee_name, employee_depId);
    //response.redirect("/Employees");
    //response.sendStatus(200);
};

//Удаление работяги
exports.deleteEmployee = function(request, response){
    let employee_id = request.params.id;
    console.log("Id:" + employee_id);
    employee_viewmodel.deleteEmployee(employee_id);
    response.sendStatus(204);
    //response.redirect("/Employees");
};

//Редактирование
exports.editEmployeeGet = function(request, response){
    let employee_id = request.query.id;
    let employee_name = request.query.name;
    let employee_depId = request.query.departmentId;
    let departments;
    //использоваение department_viewmodel в EMPLOYEES????
    department_viewmodel.selectAll().
    then((data)=>{
        departments = data;
        response.render("edit_employees", {departments: departments, id: employee_id, name: employee_name, departmentId: employee_depId});
    });
};

exports.editEmployeePost = function(request, response){
    if(!request.body) return response.sendStatus(400);
    let employee_id = request.body.id;
    let employee_name = request.body.name;
    let employee_depId = request.body.departmentId;
    employee_viewmodel.editEmployee(employee_id, employee_name, employee_depId);
    //response.redirect("/Employees");
    //response.sendStatus(200);
    //response.end();
};

//Редактирование работяги по его id ВЫВОД РАБОТЯГИ В JSON
exports.editEmployeeViaIdGet = function (request, response) {
    let employee_id = request.params.id;
    //console.log(department_id);
    employee_viewmodel.findEmployee(employee_id).
    then((data)=>{
        //console.log(data);
        response.send(data);
    });
};

