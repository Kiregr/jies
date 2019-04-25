function listToTree(list) {
    const roots = [];

    list.map(element => {
        element.children = [];
    });

    list.map(element => {
        const node = element;
        if (node.ParentId)
            list.map(element => {
                if (element.Id == node.ParentId) {
                    element.children.push(node)
                }
            });
        else roots.push(node);
    });
    return roots;
}

function test(list){
    list.map(element => {
        element.title = `${element.Name} Inn ${element.Inn}`;
        element.key = element.Id;
        delete element.ParentId;
        delete element.Name;
        delete element.Inn;
        delete element.Id;
        if(element.children !== []) {
            test(element.children);
            //console.log("Elements: ");
            //console.log(element.children);
        }/*console.log(element.children)*/
    });
    return list;
}

let entries = [
    {
        Id: 1,
        ParentId: null,
        Name: 'Родитель 1',
        Inn: 'Inn1'
    },
    {
        Id: 2,
        ParentId: 1,
        Name: 'Дочерний элемент 1',
        Inn: 'Inn2'
    },
    {
        Id: 3,
        ParentId: null,
        Name: 'Тестовый вариант',
        Inn: '13214'
    },
    {
        Id: 4,
        ParentId: 1,
        Name: '009900',
        Inn: '880055'
    },
    {
        Id: 5,
        ParentId: 1,
        Name: 'dsadasd',
        Inn: '124124125'
    },
    {
        Id: 6,
        ParentId: 3,
        Name: 'Loal',
        Inn: '5215216'
    },
    {
        Id: 7,
        ParentId: 4,
        Name: '4id',
        Inn: '321541216'
    }
];
let entries2 = [
    {
        Id: 1,
        ParentId: null,
        Name: 'Родитель 1',
        Inn: 'Inn1'
    },
    {
        Id: 2,
        ParentId: 1,
        Name: 'Дочерний элемент 1',
        Inn: 'Inn2'
    },
    {
        Id: 3,
        ParentId: null,
        Name: 'Тестовый вариант',
        Inn: '13214'
    },
    {
        Id: 4,
        ParentId: 1,
        Name: '009900',
        Inn: '880055'
    },
    {
        Id: 5,
        ParentId: 1,
        Name: 'dsadasd',
        Inn: '124124125'
    },
    {
        Id: 6,
        ParentId: 3,
        Name: 'Loal',
        Inn: '5215216'
    },
    {
        Id: 7,
        ParentId: 4,
        Name: '4id',
        Inn: '321541216'
    }
];
let listed_tree = listToTree(entries);
/*
listed_tree[1].title = listed_tree[1].Name + " " + listed_tree[1].Inn;
delete listed_tree[1].Name;
delete listed_tree[1].Inn;
console.log(listed_tree[1]);
console.log("------------------");
*/

listed_tree = test(listed_tree);
console.log(listed_tree);

/*
var tree =  [
    {title: 'Node 1', key: 1, children: []},
    {
        title: 'Folder 2', key: 2, children: [
            {title: 'Node 2.1', key: 3},
            {title: 'Node 2.2', key: 4}
        ]
    }
];
*/

function genTreeData(data) {
    console.log(test((listToTree(data))));
}
console.log("KEEEEEEEEEEEEEEEK");
genTreeData(entries2);