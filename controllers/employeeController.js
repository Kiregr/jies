const employeeViewmodel = require('../viewmodel/employee');
const departmentViewmodel = require('../viewmodel/department');

//
//
//загрузка работяги из департамента
exports.loadEmployee = function (request, response) {
    let departmentId = request.params.id;

    employeeViewmodel.findEmployeesFromDepartment(departmentId)
        .then((employees) => {
            return departmentViewmodel.findDepartmentName(departmentId)
                .then((departmentName) => {
                    console.log(departmentName);
                    employees.map(element => {
                        element.DepartmentName = departmentName;
                    });
                    return employees;
                });
        })
        .then((employees) => {
            response.send(employees)
        });
};

//Вывод таблицы с работягами
exports.showTable = function (request, response) {
    employeeViewmodel.selectAll()
        .then((data) => {
            response.render("employees", {employees: data});
        })
};

//Добавление работяги
exports.addEmployeeGet = function (request, response) {
    let departmentId = request.params.departmentId;

    response.render("employees_form", {departmentId: departmentId});
};
exports.addEmployeePost = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let employeeName = request.body.name;
    let employeeDepId = request.body.departmentId;

    employeeViewmodel.addEmployee(employeeName, employeeDepId)
        .then(() => {
            response.sendStatus(200);
        });
};

//Удаление работяги
exports.deleteEmployee = function (request, response) {
    let employeeId = request.params.id;

    employeeViewmodel.deleteEmployee(employeeId)
        .then(() => {
            response.sendStatus(204);
        });
};

//Редактирование
exports.editEmployeeGet = function (request, response) {
    let employeeId = request.query.id;
    let employeeName = request.query.name;
    let employeeDepId = request.query.departmentId;
    let departments;

    departmentViewmodel.selectAll()
        .then((data) => {
            departments = data;
            response.render("edit_employees",
                {
                    departments: departments,
                    id: employeeId,
                    name: employeeName,
                    departmentId: employeeDepId
                }
            );
        });
};

exports.editEmployeePost = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let employeeId = request.body.id;
    let employeeName = request.body.name;
    let employeeDepId = request.body.departmentId;

    employeeViewmodel.editEmployee(employeeId, employeeName, employeeDepId)
        .then(() => {
            response.sendStatus(200)
        });
};

//Редактирование работяги по его id ВЫВОД РАБОТЯГИ В JSON
exports.editEmployeeViaIdGet = function (request, response) {
    /*
    let employeeId = request.params.id;

    employeeViewmodel.findEmployee(employeeId).then((data) => {
        response.send(data);
    });
     */
    let employeeId = request.params.id;
    let employeeDepartmentId;
    let employeeName;
    let departments;

    employeeViewmodel.findEmployee(employeeId)
        .then((data) => {
            employeeDepartmentId = data.DepartmentId;
            employeeName = data.Fullname;
        })
        .then(departmentViewmodel.selectAll()
            .then((data) => {
                departments = data;
                response.render("employees_form",
                    {
                        departments: departments,
                        id: employeeId,
                        name: employeeName,
                        departmentId: employeeDepartmentId
                    }
                );
            })
        )
    /*
    departmentViewmodel.findDepartment(departmentId)
        .then((data) => {
            departmentParentId = data.ParentId;
            departmentName = data.Name;
            departmentInn = data.Inn;
        })
        .then(departmentViewmodel.selectAll()
            .then((data) => {
                parents = getParents.findParents(data, departmentId);
                response.render("departments_form", {
                    departments: parents,
                    id: departmentId,
                    name: departmentName,
                    parentId: departmentParentId,
                    inn: departmentInn
                });
            }));
     */
};

