const { json } = require('express');
const mysql = require('mysql')
var express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Connect to Local Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'covid19db'
 })

 connection.connect();
//return booking from DB
router.get('/', function (req, res) {
   connection.query("SELECT * FROM covid19db.booking;", function (err, rows, fields) {
       if (err) throw err
       res.json(rows);
   })
})

//Find booking by ID
router.get('/:id', function (req, res) {
    connection.query("SELECT * FROM covid19db.booking where id  = ?",[req.params.id], function (err, rows, fields) {
        if (err) throw err
  
        if (rows.length === 1)
            res.json(rows[0]);
        else {
            res.status(404);
            res.json({ error: "Appointment not found!" });
        }
    });
 })
 
 router.delete('/:id', function (req, res) {
    connection.query("DELETE FROM covid19db.booking WHERE id = ?", [req.params.id], function (err, rows, fields) {
        if (err) throw err
  
        if (rows.affectedRows === 1) {
            res.status(204);
        }
        else {
            res.status(404);
            res.json({ error: "Appointment not found!" });
        }
    });
 })

 router.put('/:id', jsonParser, function (req, res) {
    connection.query("UPDATE `covid19db`.`booking` SET `name` = ?, `date` = ?, `category` = ?, `location` = ?  WHERE `id` = ?;", [req.body.name,req.body.date,req.body.category,req.body.location,req.params.id], function (err, rows, fields) {
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

 router.post('/', jsonParser, function (req, res) {
    var query = connection.query('INSERT INTO `covid19db`.`booking` (`name`, `nric`, `date`, `category`, `location`) VALUES (?,?,?,?,?);', [req.body.name,req.body.nric,req.body.date,req.body.category,req.body.location], function (error, results, fields) {
        if (error) throw error;
  
        res.status(201);
        res.json({ message: "Appointment has been booked!" });
    });
 })

module.exports = router
