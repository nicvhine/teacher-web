const express = require('express');
const router = express.Router();
const taskRepo = require('../Repository/Auth-Repo');
const jwt =require('jsonwebtoken');

//USERS
router.get('/users', (req, res) => {
    taskRepo.getUsers((err, users) => {
        if (err) {
            console.error('Failed to fetch users:', err);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.json(users);
        }
    });
});

router.post('/users', (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    taskRepo.addUser(email, username, password, (err, result) => {
        if (err) {
            console.error('Failed to add user:', err);
            res.status(500).json({ error: 'Failed to add user' });
        } else {
            res.status(201).json({ message: 'User added successfully' });
        }
    });
});

router.post('/login',(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    taskRepo.getUserByEmail(email, (err, user) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'An error occurred during login' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        
        res.status(200).json({ message: 'Login successful' });
    });
});



//CLASS
router.post('/class', (req, res) => {
    const { name, description, startYear, endYear } = req.body;
    if (!name || !description || !startYear || !endYear) {
        return res.status(400).json({ error: 'Name, description, startYear, and endYear are required' });
    }

    taskRepo.addClass(name, description, startYear, endYear, (err, result) => {
        if (err) {
            console.error('Failed to add class:', err);
            res.status(500).json({ error: 'Failed to add class' });
        } else {
            res.status(201).json({ message: 'Class added successfully' });
        }
    });
});

router.get('/class/:id', (req, res) => {
    const { id } = req.params;
    taskRepo.getClassById(id, (err, classDetails) => {
        if (err) {
            console.error('Failed to fetch class details:', err);
            res.status(500).json({ error: 'Failed to fetch class details' });
        } else {
            res.json(classDetails);
        }
    });
});

router.get('/class', (req, res) => {
    taskRepo.getClasses((err, classes) => {
        if (err) {
            console.error('Failed to fetch classes:', err);
            res.status(500).json({ error: 'Failed to fetch classes' });
        } else {
            res.json(classes);
        }
    });
});

router.put('/class/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, startYear, endYear } = req.body;
    if (!name || !description || !startYear || !endYear) {
        return res.status(400).json({ error: 'Name, description, startYear, and endYear are required' });
    }

    taskRepo.getClassById(id, (err, classDetails) => {
        if (err) {
            console.error('Error fetching class details:', err);
            return res.status(500).json({ error: 'Failed to fetch class details' });
        }
        if (!classDetails) {
            return res.status(404).json({ error: 'Class not found' });
        }

        taskRepo.updateClass(id, name, description, startYear, endYear, (err, result) => {
            if (err) {
                console.error('Failed to update class:', err);
                res.status(500).json({ error: 'Failed to update class' });
            } else {
                res.status(200).json({ message: 'Class updated successfully' });
            }
        });
    });
});

//STUDENTS

router.post('/class/:classId/students', (req, res) => {
    const { classId } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    taskRepo.addStudent(name, email, classId, (err, result) => {
        if (err) {
            console.error('Failed to add student:', err);
            res.status(500).json({ error: 'Failed to add student' });
        } else {
            res.status(201).json({ message: 'Student added successfully' });
        }
    });
});

router.get('/class/:id/studentCount', (req, res) => {
    const { id } = req.params;
    taskRepo.getStudentCountForClass(id, (err, count) => {
        if (err) {
            console.error('Failed to fetch student count:', err);
            res.status(500).json({ error: 'Failed to fetch student count' });
        } else {
            res.json({ studentCount: count });
        }
    });
});


router.get('/class/:classId/students', (req, res) => {
    const { classId } = req.params;
    taskRepo.getStudentsForClass(classId, (err, students) => {
        if (err) {
            console.error('Failed to fetch students:', err);
            res.status(500).json({ error: 'Failed to fetch students' });
        } else {
            res.json(students);
        }
    });
});

router.put('/class/:classId/students/:studentId/status', (req, res) => {
    const { classId, studentId } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    taskRepo.updateStudentStatus(studentId, status, (err, result) => {
        if (err) {
            console.error('Failed to update student status:', err);
            res.status(500).json({ error: 'Failed to update student status' });
        } else {
            res.status(200).json({ message: 'Student status updated successfully' });
        }
    });
});

// TASK
router.post('/class/:classId/tasks', (req, res) => {
    const { classId } = req.params;
    const { title, description, due_date } = req.body;
    if (!title || !description || !due_date) {
        return res.status(400).json({ error: 'Fields are required' });
    }

    taskRepo.addTasks(title, description, due_date, classId, (err, result) => {
        if (err) {
            console.error('Failed to add task:', err);
            res.status(500).json({ error: 'Failed to add task' });
        } else {
            res.status(201).json({ message: 'Task added successfully' });
        }
    });
});


router.get('/class/:classId/tasks', (req, res) => {
    const { classId } = req.params;
    taskRepo.getTasks(classId, (err, students) => {
        if (err) {
            console.error('Failed to fetch students:', err);
            res.status(500).json({ error: 'Failed to fetch students' });
        } else {
            res.json(students);
        }
    });
});

router.put('/class/:classId/tasks/:id/status', (req, res) => {
    const { classId, id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    taskRepo.updateStudentStatus(id, status, (err, result) => {
        if (err) {
            console.error('Failed to update student status:', err);
            res.status(500).json({ error: 'Failed to update student status' });
        } else {
            res.status(200).json({ message: 'Student status updated successfully' });
        }
    });
});

module.exports = router;