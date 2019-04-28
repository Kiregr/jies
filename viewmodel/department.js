const Department = require('../models/department');

//Вывод таблицы
exports.selectAll = function () {
    return Department.findAll({raw: true})
        .then((result) => {
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

//Вывод названий департаментов
exports.findDepartmentName = function (id) {
    return Department.findByPk(id, {
        raw: true,
        attributes: ['Name'],
        })
        .then((result) => {return result.Name});
};


//
//представление данных в виде дерева
function listToTree(list) {
    const roots = [];

    list.map(element => {
        element.children = [];
    });

    list.map(element => {
        const node = element;
        if (node.ParentId)
            list.map(element => {
                if (element.Id === node.ParentId) {
                    element.children.push(node)
                }
            });
        else roots.push(node);
    });
    return roots;
}

//представление дерева в нужном формате (для fancytree)
function createFancyTreeData(list) {
    list.map(element => {
        element.title = `${element.Name} Inn ${element.Inn}`;
        element.key = element.Id;

        delete element.ParentId;
        delete element.Name;
        delete element.Inn;
        delete element.Id;

        if (element.children !== []) {
            element.folder = true;
            createFancyTreeData(element.children);
        }
    });
    return list;
}

//вызов необходимых для генерации source-данных для fancytree
exports.genTreeData = function (data) {
    return createFancyTreeData((listToTree(data)));
};