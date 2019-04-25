const express = require("express");
const app = express();

const Sequelize = require('sequelize');
const sequelize = require('./common/sqlite');

const bodyParser = require("body-parser");

const employeeRouter = require("./routes/employee");
const departmentRouter = require('./routes/department');
const treeRoutes = require('./routes/tree');

sequelize
    .authenticate()
    .then(() => {
        console.log("Delo sdelano");
    })
    .catch(error => {
        console.error("Error");
        console.error(error);
    });

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));

//использование статических файлов
app.use(express.static('public'));

const indexRouter = require("./routes/index");
app.use('/', indexRouter);

//Employees
//const employeeRouter = require("./routes/employee");
app.use('/Employees', employeeRouter);

//Departments
//const departmentRouter = require('./routes/department');
app.use('/Departments', departmentRouter);

//Tree
//const treeRoutes = require('./routes/tree');
app.use('/Tree', treeRoutes);

app.listen(3000);