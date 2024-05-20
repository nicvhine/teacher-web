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

// Add Folder
const addFolder = (name, callback) => {
    const sql = 'INSERT INTO Folders (name) VALUES (?)';
    pool.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error adding folder:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

// Add File
const addFile = (name, folder_id, callback) => {
    const sql = 'INSERT INTO Files (name, folder_id) VALUES (?, ?)';
    pool.query(sql, [name, folder_id], (err, result) => {
        if (err) {
            console.error('Error adding file:', err);
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
    addFile,
    addFolder
};
