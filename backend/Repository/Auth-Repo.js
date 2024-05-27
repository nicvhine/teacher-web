const pool = require('../Database');
const jwt = require('jsonwebtoken');


//USER
const addUser = (email, password, callback) => {
    const checkDuplicateSql = 'SELECT * FROM users WHERE email = ?';
    const sql = 'INSERT INTO users (email) VALUES (?)';
    pool.query(checkDuplicateSql, [email], (err, rows) => {
        if (err) {
            console.error('Error checking for duplicate users:', err);
            callback(err);
            return;
        }

        if (rows.length > 0) {
            const duplicateError = new Error('A user with the same email already exists.');
            duplicateError.statusCode = 409;
            callback(duplicateError);
            return;
        }

        const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        pool.query(insertSql, [email, password], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                callback(err);
            } else {
                callback(null, result);
            }
        });
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

//CLASS
const addClass = (name, description, group, startYear, endYear, callback) => {
    // Check if a class with the same name and group already exists
    const checkDuplicateSql = 'SELECT * FROM classes WHERE name = ? AND `group` = ?';
    pool.query(checkDuplicateSql, [name, group], (err, rows) => {
        if (err) {
            console.error('Error checking for duplicate class:', err);
            callback(err);
            return;
        }

        if (rows.length > 0) {
            const duplicateError = new Error('A class with the same name and group already exists.');
            // Pass status code 409 for conflict
            duplicateError.statusCode = 409;
            callback(duplicateError);
            return;
        }

        // If no duplicate class found, proceed with adding the new class
        const insertSql = 'INSERT INTO classes (name, description, `group`, startYear, endYear) VALUES (?, ?, ?, ?, ?)';
        pool.query(insertSql, [name, description, group, startYear, endYear], (err, result) => {
            if (err) {
                console.error('Error adding class:', err);
                callback(err);
            } else {
                callback(null, result);
            }
        });
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

const deleteClass = (id, callback) => {
    const sql = 'DELETE FROM classes WHERE id = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting class:', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
};
//STUDENT
const addStudent = (name, email, classId, callback) => {
    const checkDuplicateSql = 'SELECT * FROM students WHERE email = ?';

    pool.query(checkDuplicateSql, [email], (err, rows) => {
        if (err) {
            console.error('Error checking for duplicate students:', err);
            callback(err);
            return;
        }

        if (rows.length > 0) {
            const duplicateError = new Error('A student with the same email already exists.');
            duplicateError.statusCode = 409;
            callback(duplicateError);
            return;
        }
        const insertSql = 'INSERT INTO students (name, email, classId) VALUES (?, ?, ?)';
        pool.query(insertSql, [name, email, classId], (err, result) => {
            if (err) {
                console.error('Error adding student:', err);
                callback(err);
            } else {
                callback(null, result);
            }
        });
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

const getStudentCountForClass = (classId, callback) => {
    const sql = 'SELECT COUNT(*) AS studentCount FROM students WHERE classId = ?';
    pool.query(sql, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching student count:', err);
            callback(err);
        } else {
            callback(null, results[0].studentCount);
        }
    });
};

const getTaskCountForClass = (classId, callback) => {
    const sql = 'SELECT COUNT(*) AS taskCount FROM tasks WHERE classId = ?';
    pool.query(sql, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching task count:', err);
            callback(err);
        } else {
            callback(null, results[0].taskCount);
        }
    });
};

const addTasks = (title, description, due_date, classId, callback) => {
    const checkDuplicateSql = 'SELECT * FROM tasks WHERE title = ? AND description = ?';

    pool.query(checkDuplicateSql, [title, description], (err, rows) => {
        if (err) {
            console.error('Error checking for duplicate tasks:', err);
            callback(err);
            return;
        }

        if (rows.length > 0) {
            const duplicateError = new Error('Information provided has duplicates');
            duplicateError.statusCode = 409;
            callback(duplicateError);
            return;
        }

        const insertSql = 'INSERT INTO tasks (title, description, due_date, classId) VALUES (?, ?, ?, ?)';
        pool.query(insertSql, [title, description, due_date, classId], (err, result) => {
            if (err) {
                console.error('Error adding task:', err);
                callback(err);
            } else {
                callback(null, result);
            }
        });
    });
};

  
const getTasks = (classId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE classId = ?';
    pool.query(sql, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

const updateTaskStatus = (id, status, callback) => {
    const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
    pool.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating task status:', err);
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
    deleteClass,
    getStudentCountForClass,
    addTasks,
    getTasks,
    updateTaskStatus,
    getTaskCountForClass
};