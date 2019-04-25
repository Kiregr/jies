let express = require('express');
let router = express.Router();

//контроллер
let employee_controller = require('../controllers/employeeController');

// Вывод таблицы с работягами
router.get('/', employee_controller.showTable);
//Добавление работяги
router.get('/Add/:departmentId', employee_controller.addEmployeeGet);
router.post('/Add', employee_controller.addEmployeePost);
//Удаление работяги
router.get('/Delete', employee_controller.deleteEmployee);
router.delete('/Delete/test/:id', employee_controller.deleteEmployee);
//Редактирование работяги
router.get('/Edit', employee_controller.editEmployeeGet);
router.post('/Edit', employee_controller.editEmployeePost);
//вывод работяги по его id
router.get('/:id', employee_controller.editEmployeeViaIdGet);
module.exports = router;