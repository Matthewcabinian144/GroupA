const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const bodyParser = require('body-parser').json();
const axios = require('axios');

const connection = mysql.createConnection({
    host: 'team1db.cqlqhfhtmf3o.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'covid19db'
})

connection.connect();

/*
********************************* LOGIN API *********************************************************
*/

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

            res.json({ message: "User Login Successful!" });
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
    connection.query("SELECT * FROM covid19db.users where nric  = ?;", req.body.nric, function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

/*
**************************** BOOKING API *********************************************************
*/

router.post('/home', bodyParser, function (req, res) {
    connection.query("SELECT * FROM covid19db.booking where nric = ?;", req.body.nric, function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

router.delete('/home/:id', function (req, res) {
    connection.query("DELETE FROM covid19db.booking WHERE id = ?", [req.params.id], function (err, rows, fields) {
        if (err) throw err

        if (rows.affectedRows === 1) {
            res.status(204);
            res.end();
        }
        else {
            res.status(404);
            res.json({ error: "Appointment not found!" });
        }
    });
})

router.put('/:id', bodyParser, function (req, res) {
    connection.query("UPDATE `covid19db`.`booking` SET `name` = ?, `date` = ?, `category` = ?, `location` = ?  WHERE `id` = ?;", [req.body.name, req.body.date, req.body.category, req.body.location, req.params.id], function (err, rows, fields) {
        if (err) throw err

        if (rows.changedRows === 1) {
            res.status(200).json({ message: "Appointment updated!" });
        }
        else {
            res.status(404);
            res.json({ error: "Appointment not found!" });
        }
    });
})

router.post('/home/booking', bodyParser, function (req, res) {
    connection.query('INSERT INTO `covid19db`.`booking` (`name`, `nric`, `category`, `location`, `date`, `time`) VALUES (?,?,?,?,?,?);', [req.body.name, req.body.nric, req.body.category, req.body.location, req.body.date, req.body.time], function (error, results, fields) {
        if (error) throw error;

        res.status(201);
        res.json({ message: "Appointment has been booked!" });
    });
})

module.exports = router
