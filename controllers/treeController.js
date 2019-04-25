const tree_viewmodel = require('../viewmodel/tree');
const department_viewmodel = require('../viewmodel/department');
const employee_viewmodel = require('../viewmodel/employee');

//вывод депертаментов в виде списка
exports.getData = function (request, response){
    department_viewmodel.selectAll().
    then((data)=>{
        let treeData = tree_viewmodel.genTreeData(data);
        console.log(treeData);
        response.render('tree',{tree_data: treeData});
    })
};
//получение данных департаментов после обновления
exports.reloadData = function (request, response){
    department_viewmodel.selectAll().
    then((data)=>{
        let treeData = tree_viewmodel.genTreeData(data);
        //console.log(treeData);
        //response.render('tree',{tree_data: treeData});
        response.send(treeData);
    })
};

//загрузка работяги из департамента
exports.loadEmployee = function (request, response){
    let department_id = request.params.id;
    console.log(department_id);
    employee_viewmodel.findEmployeesFromDepartment(department_id).
    then((data)=>{
        console.log(data);
        response.send(data);
    });
};