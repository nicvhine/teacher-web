const pool = require('../Database');

// USER
const addUser = (email, username, password, callback) => {
    const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    pool.query(sql, [email, username, password], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

const getUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

const getUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user by email:', err);
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]); 
    });
};

// CLASS
const addClass = (name, description, startYear, endYear, callback) => {
    const sql = 'INSERT INTO classes (name, description, startYear, endYear) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, description, startYear, endYear], (err, result) => {
        if (err) {
            console.error('Error adding class:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

const getClassById = (id, callback) => {
    const sql = 'SELECT * FROM classes WHERE id = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching class details:', err);
            callback(err);
        } else {
            callback(null, result[0]);
        }
    });
};

const getClasses = (callback) => {
    const sql = 'SELECT * FROM classes';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching classes:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

// Student List
const addStudent = (name, email, classId, callback) => {
    const sql = 'INSERT INTO students (name, email, classId) VALUES (?, ?, ?)';
    pool.query(sql, [name, email, classId], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    addUser,
    getUserByEmail,
    getUsers,
    addClass,
    getClasses,
    getClassById,
    addStudent
};
