const pool = require('../Database');
const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
};
//USER
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

const login = (email, password, callback) => {
    getUserByEmail(email, async (err, user) => {
        if (err) {
            console.error('Error during login:', err);
            return callback(err);
        }
        if (!user) {
            return callback(null, null);
        }

        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return callback(null, null);
            }

            // Generate tokens
            const tokens = generateTokens(user.id);
            callback(null, tokens);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            callback(error);
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


//STUDENT
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

//TASKS
const addTasks = (title, description, due_date, classId, callback) => {
    const sql = 'INSERT INTO tasks (title, description, due_date, classId) VALUES (?, ?, ?, ?)';
    pool.query(sql, [title, description, due_date, classId], (err, result) => {
        if (err) {
            console.error('Error adding task:', err);
            return callback(err); 
        }
        callback(null, result);
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
    getStudentCountForClass,
    addTasks,
    getTasks,
    updateTaskStatus,
    generateTokens,
    login
};