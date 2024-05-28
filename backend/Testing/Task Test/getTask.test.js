const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    getTasks: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('GET /class/:classId/tasks', () => {
    it('should fetch tasks for the given class successfully', async () => {
        const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
        taskRepo.getTasks.mockImplementation((classId, callback) => {
            callback(null, mockTasks);
        });

        const classId = 1;
        const response = await request(app).get(`/class/${classId}/tasks`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTasks);
    });

    it('should return 500 if there is an error fetching tasks', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.getTasks.mockImplementation((classId, callback) => {
            callback(databaseError);
        });

        const classId = 1;
        const response = await request(app).get(`/class/${classId}/tasks`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch students' });
    });
});
