const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 5,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sqaFinals',
    debug : false

    // host : 'localhost',
    // user : 'sqaFinals',
    // password : 'sqaFinals',
    // database : 'sqaFinalsDatabase',
    // debug : false
});

module.exports = pool;      