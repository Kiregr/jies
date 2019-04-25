const express = require("express");
const hehmdaheh = express();

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database("C:/sqlite/databases/prod.db", (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log("Connected to db");
});

let query = `SELECT * FROM Departments`;
db.serialize(()=>{
    db.each(query, (err,row)=>{
        if(err){
            console.error(err.message);
        }
        console.log("Id: " +  row.Id + "\t Name: " + row.Name);
    });
});

db.close((err) => {
    if(err){
        return console.error(err.message);
    }
    console.log("Close connection to db")
})

hehmdaheh.get("/", function (request, response) {
    response.setHeader("Content-Type", "text/html");
    response.end("<h2>Hello, World</h2>");
});

hehmdaheh.listen(3000);