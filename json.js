/*
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    console.log("MAP:");
    console.log(map);
    console.log("List:");
    console.log(list);
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
            console.log(`${i} itter list/roots`);
            console.log(list);
            console.log(JSON.stringify(roots));
        } else {
            roots.push(node);
        }
        console.log(`${i} itter roots`);
        console.log(JSON.stringify(roots));
    }
    return roots;
}
*/

function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].Id] = i; // initialize the map
        list[i].Children = []; // initialize the children
    }
    //console.log("MAP:");
    //console.log(map);
    //console.log("List:");
    //console.log(list);
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.ParentId !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.ParentId]].Children.push(node);
            //console.log(`${i} itter list/roots`);
            //console.log(list);
            //console.log(JSON.stringify(roots));
        } else {
            roots.push(node);
        }
        //console.log(`${i} itter roots`);
        //console.log(JSON.stringify(roots));
    }
    return roots;
}

var entries = [
    { id: "1", parentId: "0", Name: "Родитель 1", Inn: 'Inn1' },
    { id: "2", parentId: "1", Name: "Дочерний элемент 1", Inn: 'Inn2' },
    { id: "3", parentId: "1", Name: "Тестовый вариант", Inn: '13214' }
];

var json =  [
    { Id: 1, ParentId: null, Name: 'Родитель 1', Inn: 'Inn1' },
    { Id: 2, ParentId: 1, Name: 'Дочерний элемент 1', Inn: 'Inn2' },
    { Id: 3, ParentId: 1, Name: 'Тестовый вариант', Inn: '13214' },
    { Id: 4, ParentId: null, Name: '009900', Inn: '880055' },
    { Id: 5, ParentId: 1, Name: 'dsadasd', Inn: '124124125' },
    { Id: 6, ParentId: 3, Name: 'Loal', Inn: '5215216' }
];

//console.log(JSON.stringify(json));

var kek = [
    {title: "Node 1", key: "1", children:[]},
    {title: "Folder 2", key: "2", children: [
            {title: "Node 2.1", key: "3"},
            {title: "Node 2.2", key: "4"}
        ]
    }
];
//console.log(kek);

var tree_from_data = list_to_tree(json);

//console.log((tree_from_data));
//console.log(list_to_tree(entries));
//console.log(kek);
console.log(tree_from_data);
console.log("------------");
console.log(tree_from_data[0]["Children"][1]);

