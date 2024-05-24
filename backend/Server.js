const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const taskEndpoints = require('./Endpoint/Auth-End');
const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'd0b5feeacfec370cef52f5a87597ed14f463537703a61011585d7d18cc59d21f';


app.use(bodyParser.json());
app.use(cors());

const db = require('./Database');

app.use('/api', taskEndpoints);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});