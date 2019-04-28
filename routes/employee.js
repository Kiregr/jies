const express = require('express');
const router = express.Router();

//контроллер
const employeeController = require('../controllers/employeeController');

//
//
//
router.get('/load_employees/:id', employeeController.loadEmployee);

// Вывод таблицы с работягами
router.get('/', employeeController.showTable);

//Добавление работяги
router.get('/Add/:departmentId', employeeController.addEmployeeGet);
router.post('/Add', employeeController.addEmployeePost);

//Удаление работяги
router.get('/Delete', employeeController.deleteEmployee);
router.delete('/Delete/test/:id', employeeController.deleteEmployee);

//Редактирование работяги
router.get('/Edit', employeeController.editEmployeeGet);
router.get('/Edit/:id', employeeController.editEmployeeViaIdGet);
router.post('/Edit', employeeController.editEmployeePost);

//вывод работяги по его id
router.get('/:id', employeeController.editEmployeeViaIdGet);

module.exports = router;