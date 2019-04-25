const express = require("express");
const app = express();

const Sequelize = require('sequelize');
const sequelize = require('./common/sqlite');

const bodyParser = require("body-parser");

sequelize
    .authenticate()
    .then(()=>{
        console.log("Delo sdelano");
    })
    .catch(err=>{
        console.error("Error");
    });

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));

//использование статических файлов
app.use(express.static('public'));
//app.use('/images', express.static(__dirname + '/Images'));

//???
//const urlencodedParser = bodyParser.urlencoded({extended: false});

const indexRouter = require("./routes/index");
app.use('/', indexRouter);

//Employees
const employeeRouter = require("./routes/employee");
app.use('/Employees', employeeRouter);

//Departments
const departmentRouter = require('./routes/department');
app.use('/Departments', departmentRouter);

//Tree
const treeRoutes = require('./routes/tree');
app.use('/Tree', treeRoutes);

app.listen(3000);