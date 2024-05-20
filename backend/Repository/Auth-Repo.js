const pool = require('../Database');
const jwt = require('jsonwebtoken');
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

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
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

const updateClass = (id, name, description, startYear, endYear, callback) => {
    const sql = 'UPDATE classes SET name = ?, description = ?, startYear = ?, endYear = ? WHERE id = ?';
    pool.query(sql, [name, description, startYear, endYear, id], (err, result) => {
        if (err) {
            console.error('Error updating class:', err);
            callback(err);
        } else {
            callback(null, result);
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

const getStudentsForClass = (classId, callback) => {
    const sql = 'SELECT * FROM students WHERE classId = ?';
    pool.query(sql, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching students for class:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

//UPDATE STUDENT STATUS
const updateStudentStatus = (studentId, status, callback) => {
    const sql = 'UPDATE students SET status = ? WHERE id = ?';
    pool.query(sql, [status, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student status:', err);
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
    addStudent,
    getStudentsForClass,
    updateClass,
    updateStudentStatus,
    authenticateToken
};
