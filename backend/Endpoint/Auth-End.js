const express = require('express');
const router = express.Router();
const taskRepo = require('../Repository/Auth-Repo');

// USER
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

router.post('/login', (req, res) => {
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
        res.status(200).json({ message: 'Login successful', user });
    });
});

// CLASS
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

// STUDENT
router.post('/:classId/students', (req, res) => {
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

module.exports = router;
