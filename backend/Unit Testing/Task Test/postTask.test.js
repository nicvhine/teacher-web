const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    addTasks: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('POST /class/:classId/tasks', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should add a task successfully', async () => {
        const mockResult = { affectedRows: 1 }; 
        taskRepo.addTasks.mockImplementation((title, description, due_date, classId, callback) => {
            callback(null, mockResult);
        });

        const response = await request(app)
            .post('/class/1/tasks')
            .send({ title: 'Task 1', description: 'Description 1', due_date: '2024-06-01' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Task added successfully' });
    });

    it('should return 500 if there is an error adding a task', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.addTasks.mockImplementation((title, description, due_date, classId, callback) => {
            callback(databaseError);
        });

        const response = await request(app)
            .post('/class/1/tasks')
            .send({ title: 'Task 1', description: 'Description 1', due_date: '2024-06-01' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to add task' });
    });

    it('should return 400 if any required field is missing', async () => {
        const response = await request(app)
            .post('/class/1/tasks')
            .send({ title: 'Task 1', description: 'Description 1' }); 

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Fields are required' });
    });
});
