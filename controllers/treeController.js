const treeViewmodel = require('../viewmodel/tree');
const departmentViewmodel = require('../viewmodel/department');
const employeeViewmodel = require('../viewmodel/employee');

//вывод депертаментов в виде списка
exports.getData = function (request, response) {
    departmentViewmodel.selectAll()
        .then((data) => {
            let treeData = treeViewmodel.genTreeData(data);

            //console.log(`TREEDATA: \n ${treeData}`);
            response.render('tree', {tree_data: treeData});
        })
};
//получение данных департаментов после обновления
exports.reloadData = function (request, response) {
    departmentViewmodel.selectAll()
        .then((data) => {
            let treeData = treeViewmodel.genTreeData(data);

            response.send(treeData);
        })
};
//загрузка работяги из департамента
exports.loadEmployee = function (request, response) {
    let departmentId = request.params.id;

    employeeViewmodel.findEmployeesFromDepartment(departmentId)
        .then((employees) => {
            //console.log(`EMPLOYEES FROM DEPARTMENT: \n ${employees}`);
            response.send(employees);
        });
};