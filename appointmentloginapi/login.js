const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const bodyParser = require('body-parser').json();
const axios = require('axios');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'covid19db'
})

connection.connect();

//Check if user details are present and correct in user database
router.post('/', bodyParser, (req, res) => {
    let name;

    connection.query("SELECT * FROM covid19db.users where nric=? and password = ?", [req.body.nric, req.body.password], function (err, rows, fields) {
        if (err) throw err
        if (rows.length === 1) {
            axios.get('https://sandbox.api.myinfo.gov.sg/com/v3/person-sample/' + req.body.nric)
                .then(res => {
                    name = res.data.name.value;
                    connection.query("UPDATE `covid19db`.`users` SET `name` = ? WHERE `nric` = ?;", [name, req.body.nric])
                })  
                .catch(error => console.log(error.response))
            
            res.json({ message: "User Login Successful!"});
            res.end();
        } else { //User exists but password is incorrect
            connection.query("SELECT * FROM covid19db.users where nric=?", [req.body.nric], function (err, rows, fields) {
                if (err) throw err
                if (rows.length === 1) {
                    res.status(401);
                    res.json({ error: "Incorrect Password!" });
                    res.end();
                }
                else {
                    res.status(404);
                    res.json({ error: "User not found!" });
                    res.end();
                }
            });
        }
    });
});

//Get name of person who logged in
router.post('/user', bodyParser, function (req, res) {
    // var nric = "S9812381D";
    connection.query("SELECT * FROM covid19db.users where nric  = ?;", req.body.nric, function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

module.exports = router
