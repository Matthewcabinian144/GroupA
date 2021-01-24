/**
 * Backend written in NodeJS to connect our frontend react application to our MySQL Database
 * 
 * @author Ian Tjahjono
 */
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

/**
 * This method checks whether the details entered by the user are correct. 
 * If the details are correct, the method makes a call to the SingPass API and retrieves the name of the user.
 * If the details are incorrect, the method first checks whether the NRIC entered is present in the database. If present,
 * the password entered is wrong. If not present, the user does not exist in the database at all.
 * 
 * @param nric User's NRIC. Should start with S/T followed by 7 numbers and ends with a letter. 
 * @param password User defined password. Not case sensitive
 * @param name Name of the user retrieved from SingPass API and stored into the database.
 */
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

/**
 * This method gets the entry of the user through searching by NRIC
 * 
 * @param nric User NRIC. Captured from when user first logs in to the system
 * @returns Entry of the user as stored in the database
 */
router.post('/user', bodyParser, function (req, res) {
    connection.query("SELECT * FROM covid19db.users where nric  = ?;", req.body.nric, function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

/*
**************************** BOOKING API *********************************************************
*/
/**
*Sending or Receiving information to and from the MySQL Database
*@author Matthew Cabinian
*
*/

router.post('/home', bodyParser, function (req, res) {
    connection.query("SELECT * FROM covid19db.booking where nric = ?;", req.body.nric, function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

//Delete function for any appointment listing
//Delete by booking ID  
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

//Udpate function for any changes to user's appointment
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

//Create new listing fucntion and send to MySQL database
/**
*User input of the following parameters is stored into the database
*@param name User's name
*@param nric User's Singapore Identiy Card Number
*@param date Date and time selected for appointment
*@param category 3 options (Mask, Tokens, Vaccinations) chosen for the appointment
*@param location The various locations for user to collect the options in the Category parameter
*@result Message Confirmation Message that the booking parameters have been filled and has been stored and listed
*/
router.post('/home/booking', bodyParser, function (req, res) {
    connection.query('INSERT INTO `covid19db`.`booking` (`name`, `nric`, `category`, `location`, `date`, `time`) VALUES (?,?,?,?,?,?);', [req.body.name, req.body.nric, req.body.category, req.body.location, req.body.date, req.body.time], function (error, results, fields) {
        if (error) throw error;

        res.status(201);
        res.json({ message: "Appointment has been booked!" });
    });
})

module.exports = router
