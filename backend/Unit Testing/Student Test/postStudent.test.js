const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo'); 

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    addStudent: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('POST /class/:classId/students', () => {
    it('should return 201 and a success message when adding a new student', async () => {
        taskRepo.addStudent.mockImplementation((name, email, classId, callback) => {
            callback(null, 'success');
        });

        const response = await request(app)
            .post('/class/1/students')
            .send({ name: 'John Doe', email: 'john@example.com' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Student added successfully' });
    });

    it('should return 400 when name or email is missing', async () => {
        const response = await request(app)
            .post('/class/1/students')
            .send({ name: 'John Doe' }); 

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Name and email are required' });
    });

    it('should return 409 when attempting to add a student with a duplicate email', async () => {
        const duplicateError = new Error('A student with the same email already exists.');
        duplicateError.statusCode = 409;
        taskRepo.addStudent.mockImplementation((name, email, classId, callback) => {
            callback(duplicateError);
        });

        const response = await request(app)
            .post('/class/1/students')
            .send({ name: 'John Doe', email: 'john@example.com' });

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: 'A student with the same email already exists.' });
    });

    it('should return 500 when encountering a database error', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.addStudent.mockImplementation((name, email, classId, callback) => {
            callback(databaseError);
        });

        const response = await request(app)
            .post('/class/1/students')
            .send({ name: 'John Doe', email: 'john@example.com' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to add student' });
    });

});
