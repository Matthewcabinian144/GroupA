const express = require('express');
const cors = require('cors');
const login = require('./login');
const path = require('path');
const app = express();

//app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use('/login', login);

app.listen(5000);