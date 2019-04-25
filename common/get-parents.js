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

function defineParent(list, id){
    const parents = [];
    list.map(element => {
        //delete element.ParentId;
        delete element.Inn;

        if(element.children.length !== 0){
            defineParent(element.children, id);
            if(element.Id == id) {
                delete element.children;
            }
        }
        else{
            delete element.children;
        }
        parents.push(element);
    });

    //console.log("LIST:");
    //console.log(parents);
    return parents;
}

function editParents(list){
    list.map(element =>{
        const node = element;
        if(node.children) {
            editParents(element.children);
            delete element.children;
        }
        parents.push(node);
    });
}

let parents = [];
function callEditParents(list){
    parents = [];
    editParents(list);
    return parents;
}

//герерация возможных родителей

exports.findParents = function(data, id) {
    let tree = listToTree(data);
    let parents = defineParent(tree, id);
    let editedParents = callEditParents(parents);
    console.log(editedParents);
    //defineParent(tree, id);
    return editedParents;
};