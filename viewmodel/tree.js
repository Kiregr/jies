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