let express = require('express');
let router = express.Router();

//контроллер
let department_controller = require('../controllers/departmentController');

// Вывод таблицы с департаментами
router.get('/', department_controller.showTable);
//Добавление департамента
router.get('/Add', department_controller.addDepartmentGet);
router.post('/Add', department_controller.addDepartmentPost);
//Удаление департамента
router.get('/Delete/:id', department_controller.deleteDepartment);
router.delete('/Delete/test/:id', department_controller.deleteDepartment);
//Редактирование департамента
router.get('/Edit', department_controller.editDepartmentGet);
router.post('/Edit', department_controller.editDepartmentPost);

//вывод департамента по его id
router.get('/:id', department_controller.editDepartmentViaIdGet);
//поиск департаментов, но которые может ссылаться указанный департамент
router.get('/Parents/:id', department_controller.getParents);
//ТЕСТОВЫЙ ГЕТ ДЛЯ ВЫГРУЗКИ СПИСКА ---УДОЛИТЬ---
router.get('/drop_down/form/:id', department_controller.addDepartmentGetDropDown);
router.post('/drop_down/form', department_controller.addDepartmentPostDropDown);

module.exports = router;