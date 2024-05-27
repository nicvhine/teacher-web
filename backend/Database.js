const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 5,
    host : 'localhost',
    user : 'sqaFinals',
    password : 'sqaFinals',
    database : 'sqaFinalsDatabase',
    debug : false
});

module.exports = pool;      