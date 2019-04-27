function logEvent(event, data, msg) {
    //        var args = $.isArray(args) ? args.join(", ") :
    msg = msg ? ": " + msg : "";
    $.ui.fancytree.info("Event('" + event.type + "', node=" + data.node + ")" + msg);
}

function testBootBox(departmentId) {
    $.ajax({
        url: `departments/parents/${departmentId}`,
        type: 'GET',
        success: function () {
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

function loadEmployees(departmentId, departmentName) {
    console.log("LOAD EMPLOYEES");
    $.ajax({
        url: `employees/load_employees/${departmentId}`,
        type: 'GET',
        dataType: 'json',
        success: function (employees) {
            console.log("LOAD EMPLOYEES AJAX");
            console.log(JSON.stringify(employees));
            let items = [];
            $.each(employees, function (index, value) {
                items.push(`<li>
                            <b>Имя:</b> ${value.Fullname}; <b>Департамент:</b> ${departmentName} | 
                            <button type="button" class="btnEdit" onclick="editEmployee(${value.Id},'${value.Fullname}', ${departmentId}, '${departmentName}')">Редактировать</button> |
                            <button type="button" class="btnDelete" onclick="deleteEmployee(${value.Id}, ${departmentId}, '${departmentName}')">Удалить</button>
                            </li>`);
            });
            let employee_list = items.join('');
            $("#employees").html(`<p>Работяги из ${departmentName} | 
                                            <button type="button" class="btnAdd" onclick="addEmployee(${departmentId}, '${departmentName}')">Добавить</button>
                                        </p> 
                                        <ul>${employee_list}</ul>`);
        }
    });
}

// добавление/редактирование департамента
function departmentAddEditForm(departmentId) {

    console.log(departmentId ? 'Редактировать департамент' : `Добавить департамент`);

    $.ajax({
        url: departmentId ? `/Departments/Edit/${departmentId}` : `/Departments/Add`,
        type: 'GET',
        success: function (form) {
            bootbox.dialog({
                title: departmentId ? 'Редактировать' : 'Добавить',
                message: form,
                buttons: {
                    cancel: {
                        label: "Отмена!",
                        className: 'btn-danger',
                        callback: function () {
                            console.log('Custom cancel clicked');
                        }
                    },
                    ok: {
                        label: departmentId ? 'Редактировать' : `Добавить`,
                        className: 'btn-info',
                        callback: function () {
                            $.ajax({
                                url: departmentId ? `Departments/Edit` : `/Departments/Add`,
                                type: "POST",
                                data: $(this).find($("form")).serialize(),
                                success: function () {
                                    let tree = $('#tree').fancytree('getTree');
                                    tree.reload();
                                }
                            })
                        }
                    },
                }
            })
        }
    });
}

function deleteDepartment(departmentId) {
    console.log(`Deleting department`);
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
            if (result) {
                console.log("DELETE department");
                $.ajax({
                    url: `departments/delete/test/${departmentId}`,
                    type: 'DELETE',
                    success: function () {
                        let tree = $('#tree').fancytree('getTree');
                        tree.reload();
                        $("#employees").html("<p>Департамент с работягами был удален</p>");
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

function addEmployee(departmentId, departmentName) {
    console.log(`Adding employee to ${departmentId} id; Title: "${departmentName}"`);
    $.ajax({
        url: `/Employees/Add/${departmentId}`,
        type: 'GET',
        success: function (addForm) {
            console.log(addForm);

            bootbox.dialog({
                title: 'Добавление работника',
                message: addForm,
                buttons: {
                    cancel: {
                        label: "Отмена!",
                        className: 'btn-danger',
                        callback: function () {
                            console.log('Custom cancel clicked');
                        }
                    },
                    ok: {
                        label: "Добавить",
                        className: 'btn-info',
                        callback: function () {
                            $.ajax({
                                url: `Employees/Add`,
                                type: "POST",
                                data: {
                                    name: document.getElementById('nameOfEmployee').value,
                                    departmentId: document.getElementById('idOfDepartment').value
                                },
                                success: function () {
                                    loadEmployees(departmentId, departmentName);
                                }
                            })
                        }
                    },
                }
            })
            /*
            bootbox.confirm(addForm, function (result) {
                if (result) {
                    console.log("addEmployees() -> loadEmployees()");
                    $.ajax({
                        url: `Employees/Add`,
                        type: "POST",
                        data: {
                            name: document.getElementById('nameOfEmployee').value,
                            departmentId: document.getElementById('idOfDepartment').value
                        },
                        success: function () {
                            loadEmployees(departmentId, departmentName);
                        }
                    })
                }
            });
             */
        }
    });

}

function editEmployee(employeeId, employeeName, employeeDepartmentId, departmentName) {
    console.log(`Editing employee ID: ${employeeId}`);
    let id = employeeId;
    let departmentId = employeeDepartmentId;
    let name = employeeName;
    $.ajax({
        url: `/Employees/Edit?id=${id}&departmentId=${departmentId}&name=${name}`,
        type: 'GET',
        success: function (editForm) {
            bootbox.dialog({
                title: 'Редактирование работника',
                message: editForm,
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
                                url: `Employees/Edit`,
                                type: "POST",
                                data: {
                                    id: document.getElementById('idOfEmployee').value,
                                    name: document.getElementById('nameOfEmployee').value,
                                    departmentId: document.getElementById('departmentId').value
                                },
                                success: function () {
                                    loadEmployees(departmentId, departmentName);
                                }
                            })
                        }
                    },
                }
            })
            /*
            bootbox.confirm(editForm, function (res) {
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
                            loadEmployees(departmentId, departmentName);
                        }
                    })
                }
            });
             */
        }
    })
}

function deleteEmployee(employeeId, departmentId, departmentName) {
    console.log(`Deleting employee Id: ${employeeId}`);
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
                    url: `employees/delete/test/${employeeId}`,
                    type: 'DELETE',
                    success: function () {
                        console.log("deleteEmployee() -> loadEmployees()");
                        loadEmployees(departmentId, departmentName);
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
            url: "/Departments/reload_tree",
            cache: false
        },
        clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
        keyboard: true,
        renderNode: function (event, data) {
            let node = data.node;
            let $nodeSpan = $(node.span);

            // check if span of node already rendered
            if (!$nodeSpan.data('rendered')) {

                let editButton = $(`<button type="button" class="btnEdit" onclick="departmentAddEditForm(${data.node.key})">Редактировать ${data.node.key}</button>`);
                let deleteButton = $(`<button type="button" class="btnDelete" onclick="deleteDepartment(${data.node.key})">Удалить ${data.node.key}</button>`);

                $nodeSpan.append(editButton);
                $nodeSpan.append(deleteButton);

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
                });
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
});