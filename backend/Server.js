const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const taskEndpoints = require('./Endpoint/Auth-End');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = require('./Database');

app.use('/api', taskEndpoints);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});