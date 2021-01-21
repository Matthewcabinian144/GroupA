const express = require('express');
const cors = require('cors');
const app = express();
const bookings = require('./booking')
app.use('/booking', bookings)
app.use(express.static('public'))


app.listen(5000);