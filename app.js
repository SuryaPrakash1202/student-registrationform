const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
});

//db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student1"
});
db.connect(function(error) {
    if(error) { console.log("DB is not connected"); }
    else{ console.log("DB is conncted successfully !") }
});
 
// add data
app.post('/', (req,res) => {
    var name = req.body.name
    var email = req.body.email
    var age = req.body.age
    var gender = req.body.gender
    var address = req.body.address
    var password = req.body.password
    var sql = "INSERT INTO stu_reg(name, email, age, gender, address, password) VALUES(?,?,?,?,?,?);"
    db.query(sql, [name, email, age, gender, address, password], function(error,result) {
        if(error) throw error;
        res.redirect('/frontend');
    });
});

// view data
app.get('/frontend', (req,res) => {
    var sql = "SELECT * FROM stu_reg;"
    db.query(sql, function(error,result) {
        if(error) throw error
        res.render(__dirname+'/frontend',{details: result});
    });
});

app.listen(4000, function check(error) {
    if(error) { console.log("server is not connected"); }
    else{ console.log("server is up and running !")}
});