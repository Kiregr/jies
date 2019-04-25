function logEvent(event, data, msg) {
    //        var args = $.isArray(args) ? args.join(", ") :
    msg = msg ? ": " + msg : "";
    $.ui.fancytree.info("Event('" + event.type + "', node=" + data.node + ")" + msg);
}
function testBootBox(department_id){
    $.ajax({
        url: `departments/parents/${department_id}`,
        type: 'GET',
        success: function (parents) {
            $.ajax({
                url: '/Departments/drop_down/form?',
                type: 'GET',
                success: function (data) {
                    console.log(data);
                }
            });
        }
    })
}
function loadEmployees(department_id, department_name){
    console.log("LOAD EMPLOYEES");
    $.ajax({
        url: `tree/load_employees/${department_id}`,
        type: 'GET',
        dataType: 'json',
        success: function (employees) {
            console.log("LOAD EMPLOYEES AJAX");
            console.log(JSON.stringify(employees));
            let items = [];
            $.each(employees, function (index, value) {
                items.push(`<li><b>Имя:</b> ${value.Fullname}; <b>Департамент:</b> ${department_name} | <button type="button" class="btnEdit" onclick="editEmployee(${value.Id},'${value.Fullname}', ${department_id}, '${department_name}')">Редактировать</button> | <button type="button" class="btnDelete" onclick="deleteEmployee(${value.Id}, ${department_id}, '${department_name}')">Удалить</button></li>`);
            });
            let employee_list = items.join('');
            $("#employees").html(`<p>Работяги из ${department_name} | <button type="button" class="btnAdd" onclick="addEmployee(${department_id}, '${department_name}')">Добавить</button></p> <ul>${employee_list}</ul>`);
        }
    });
}
function addDepartment(){
    console.log("Adding new department");
    $.ajax({
        url: '/Departments/Add',
        type: 'GET',
        success: function (data) {
            console.log(data);
            bootbox.confirm(data, function (result) {
                if (result) {
                    $.ajax({
                        url: `Departments/Add`,
                        type: "POST",
                        data: {
                            parentId: document.getElementById('parentIdOfDepartment').value,
                            name: document.getElementById('nameOfDepartment').value,
                            inn: document.getElementById('innOfDepartment').value
                        },
                        success: function () {
                            let tree = $('#tree').fancytree('getTree');
                            tree.reload();
                        }
                    })
                }
            });
        }
    });
}
function editDepartment(department_id){
    console.log(`Editing departement Id: ${department_id}`);
    let id = department_id;
    let name;
    let parentId;
    let inn;
    $.ajax({
        url: `departments/${department_id}`,
        type: 'GET',
        dataType: 'json',
        success: function (department) {
            name = department.Name;
            parentId = department.ParentId;
            inn = department.Inn;
            $.ajax({
                url: `/Departments/Edit?id=${id}&parentId=${parentId}&name=${name}&inn=${inn}`,
                type: 'GET',
                success: function (data) {
                    bootbox.dialog({
                        title: 'Редактирование департаменов',
                        message: data,
                        size: 'large',
                        buttons: {
                            cancel: {
                                label: "Отмена!",
                                className: 'btn-danger',
                                callback: function () {
                                    console.log('Custom cancel clicked');
                                }
                            },
                            ok: {
                                label: "Редактировать",
                                className: 'btn-info',
                                callback: function () {
                                    $.ajax({
                                        url: `Departments/Edit`,
                                        type: "POST",
                                        data: {
                                            id: document.getElementById('idOfDepartment').value,
                                            parentId: document.getElementById('parentIdOfDepartment').value,
                                            name: document.getElementById('nameOfDepartment').value,
                                            inn: document.getElementById('innOfDepartment').value
                                        },
                                        success: function () {
                                            console.log("DATA ALO");
                                            console.log(this.data);
                                            let tree = $('#tree').fancytree('getTree');
                                            tree.reload();
                                            //loadEmployees(department_id, department_name);
                                        }
                                    })
                                }
                            },
                        }
                    })
                }
            });
        }
    });
}
function deleteDepartment(department_id) {
    console.log(`Deleting department`)
    bootbox.confirm({
        message: "Удалить?",
        size: 'small',
        title: "Подтвердите удаление",
        buttons: {
            confirm: {
                label: 'Да',
                className: 'btn-success'
            },
            cancel: {
                label: 'Нет',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result) {
                console.log("DELETE department");
                $.ajax({
                    url: `departments/delete/test/${department_id}`,
                    type: 'DELETE',
                    success: function () {
                        let tree = $('#tree').fancytree('getTree');
                        tree.reload();
                    },
                    error: function () {
                        bootbox.alert({
                            title: "Ошибка",
                            message: "Удаление департамента запрещено законом",
                            size: 'small'
                        });
                    }
                });
            }
        }
    });
}
function addEmployee(department_id, department_name){
    console.log(`Adding employee to ${department_id} id; Title: "${department_name}"`);
    $.ajax({
        url: `/Employees/Add/${department_id}`,
        type: 'GET',
        success: function (add_form) {
            console.log(add_form);
            bootbox.confirm(add_form, function (result) {
                if (result) {
                    console.log("addEmployees() -> loadEmployees()");
                    $.ajax({
                        url: `Employees/Add`,
                        type: "POST",
                        data: {
                            name: document.getElementById('nameOfEmployee').value,
                            departmentId: document.getElementById('idOfDepartment').value
                            /*
                            let employee_name = request.body.name;
                            let employee_depId = request.body.departmentId;
                            */
                        },
                        success: function () {
                            loadEmployees(department_id, department_name);
                        }
                    })
                }
            });
        }
    });

}
function editEmployee(employee_id, employee_name, department_id, department_name) {
    console.log(`Editing employee ID: ${employee_id}`);
    let id = employee_id;
    let departmentId = department_id;
    let name = employee_name;
    $.ajax({
        url: `/Employees/Edit?id=${id}&departmentId=${departmentId}&name=${name}`,
        type: 'GET',
        success: function (edit_form) {
            //console.log("TREE DATA: "+tree_data);
            bootbox.confirm(edit_form, function (res) {
                if (res) {
                    console.log("editEmployee() -> loadEmployees()");
                    $.ajax({
                        url: `Employees/Edit`,
                        type: "POST",
                        data: {
                            id: document.getElementById('idOfEmployee').value,
                            name: document.getElementById('nameOfEmployee').value,
                            departmentId: document.getElementById('departmentId').value
                        },
                        success: function () {
                            loadEmployees(department_id, department_name);
                        }
                    })
                }
            });
        }
    })
}
function deleteEmployee(employee_id, department_id, department_name) {
    console.log(`Deleting employee Id: ${employee_id}` );
    bootbox.confirm({
        message: "Удалить работягу?",
        buttons: {
            confirm: {
                label: 'Да',
                className: 'btn-success'
            },
            cancel: {
                label: 'Нет',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `employees/delete/test/${employee_id}`,
                    type: 'DELETE',
                    success: function () {
                        console.log("deleteEmployee() -> loadEmployees()");
                        loadEmployees(department_id, department_name);
                    }
                });
            }
        }
    });
}
$(function () {
    // Create the tree inside the <div id="tree"> element.
    $("#tree").fancytree({
        extensions: ["edit", "filter"],
        source: {
            url: "/tree/reload_tree",
            cache: false
        },
        clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
        keyboard: true,
        renderNode: function (event, data) {
            let node = data.node;
            let $nodeSpan = $(node.span);

            // check if span of node already rendered
            if (!$nodeSpan.data('rendered')) {

                let editButton = $(`<button type="button" class="btnEdit" onclick="editDepartment(${data.node.key})">Редактировать ${data.node.key}</button>`);
                let deleteButton = $(`<button type="button" class="btnDelete" onclick="deleteDepartment(${data.node.key})">Удалить ${data.node.key}</button>`)

                $nodeSpan.append(editButton );
                $nodeSpan.append(deleteButton );

                editButton.hide();
                deleteButton.hide();

                $nodeSpan.hover(function () {
                    // mouse over
                    editButton.show();
                    deleteButton.show();
                }, function () {
                    // mouse out
                    editButton.hide();
                    deleteButton.hide();
                })
                // span rendered
                $nodeSpan.data('rendered', true);
            }
        },
        dblclick: function (event, data) {
            //logEvent(event, data);
        },
        activate: function (event, data) {
            console.log(`Fanctytree "activate" -> loadEmployees(${data.node.key}, "${data.node.title}")`);
            loadEmployees(data.node.key, data.node.title);
        },
    });
})
    .on('click', '.btnInit', function () {
        console.log("Init tree");
        $("#tree").fancytree();
    });