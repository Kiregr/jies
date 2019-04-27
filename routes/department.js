const express = require('express');
const router = express.Router();

//контроллер
const departmentController = require('../controllers/departmentController');

//
//
// Вывод департаментов в виде списка
router.get('/', departmentController.getData);
//
router.get('/reload_tree', departmentController.reloadData);

// Вывод таблицы с департаментами
//router.get('/', departmentController.showTable);

//Добавление департамента
router.get('/Add', departmentController.addDepartmentGet);
router.post('/Add', departmentController.addDepartmentPost);

//Удаление департамента
router.get('/Delete/:id', departmentController.deleteDepartment);
router.delete('/Delete/test/:id', departmentController.deleteDepartment);

//Редактирование департамента
router.get('/Edit', departmentController.editDepartmentGet);
router.get('/Edit/:id', departmentController.editDepartmentViaIdGet);
router.post('/Edit', departmentController.editDepartmentPost);

//поиск департаментов, но которые может ссылаться указанный департамент
router.get('/Parents/:id', departmentController.getParents);

//ТЕСТОВЫЙ ГЕТ ДЛЯ ВЫГРУЗКИ СПИСКА ---УДАЛИТЬ---
router.get('/drop_down/form', departmentController.addDepartmentGetDropDown);
router.post('/drop_down/form', departmentController.addDepartmentPostDropDown);
//что-то очень интересное
router.post('/pepega', function (request, response) {
    response.sendStatus(200);
});

module.exports = router;