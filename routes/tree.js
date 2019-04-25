let express = require('express');
let router = express.Router();

//контроллер
let tree_controller = require('../controllers/treeController');

// Вывод департаментов в виде списка
router.get('/', tree_controller.getData );
//
router.get('/load_employees/:id', tree_controller.loadEmployee );

router.get('/reload_tree', tree_controller.reloadData);

router.get('/bootbox', function (request, response) {
    response.sendFile("C:/Users/kireg/WebstormProjects/database_project/views/bootbox.html");
});

//тестовый полигон 24 04 19
router.get('/dropdown', function(request, response){
    response.send(`<form method="post" action="/tree/dropdown">
       <p>Введите Inn:</p>
       <input type="text" name="inn" /><br /><br />
       <fieldset>
          <legend>Selecting elements</legend>
          <p>
             <label>Select list</label>
             <select id = "myList" name = "department">
               <option value = "1">one</option>
               <option value = "2">two</option>
               <option value = "3">three</option>
               <option value = "4">four</option>
             </select>
          </p>
       </fieldset>
       <input type="submit" value="Отправить" />
    </form>`);
});
router.post('/dropdown', function (request, response) {
    let test = request.body;
    response.send(test);
});

module.exports = router;