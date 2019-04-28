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
// удаление пепартамента
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
// добаление/редактирование работяги
function employeeAddEditForm(employeeId, departmentId) {
    console.log(employeeId ? 'Редактировать работягу' : `Добавить работягу`);

    $.ajax({
        url: employeeId ? `/Employees/Edit/${employeeId}` : `/Employees/Add/${departmentId}`,
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
                        label: employeeId ? 'Редактировать' : `Добавить`,
                        className: 'btn-info',
                        callback: function () {
                            $.ajax({
                                url: employeeId ? `Employees/Edit` : `/Employees/Add`,
                                type: "POST",
                                data: $(this).find($("form")).serialize(),
                                success: function () {
                                    loadEmployees(departmentId);
                                }
                            })
                        }
                    },
                }
            })
        }
    });
}
// удаление работяги
function deleteEmployee(employeeId, departmentId) {
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
                        loadEmployees(departmentId);
                    }
                });
            }
        }
    });
}
// загрузка списка работяг
function loadEmployees(departmentId) {
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
                            <b>Имя:</b> ${value.Fullname}; <b>Департамент:</b> ${value.DepartmentName} | 
                            <button type="button" class="btnEdit" onclick="employeeAddEditForm(${value.Id}, ${departmentId})">Редактировать</button> |
                            <button type="button" class="btnDelete" onclick="deleteEmployee(${value.Id}, ${departmentId})">Удалить</button>
                            </li>`);
            });
            let employee_list = items.join('');
            $("#employees").html(`<p>Список работяг | 
                                            <button type="button" class="btnAdd" onclick="employeeAddEditForm(0, ${departmentId})">Добавить</button>
                                        </p> 
                                        <ul>${employee_list}</ul>`);
        }
    });
}
// fancytree
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
            loadEmployees(data.node.key);
        },
    });
});