const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    getTaskCountForClass: jest.fn(),
    getTasks: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('GET /class/:id/taskCount', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return the count of tasks for the given class', async () => {
        const mockCount = 5;
        taskRepo.getTaskCountForClass.mockImplementation((id, callback) => {
            callback(null, mockCount);
        });

        const response = await request(app).get('/class/1/taskCount');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ taskCount: mockCount });
    });

    it('should return 500 if there is an error fetching student count', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.getTaskCountForClass.mockImplementation((id, callback) => {
            callback(databaseError);
        });

        const response = await request(app).get('/class/1/taskCount');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch task count' });
    });
});

describe('getTasks', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should fetch tasks for the given class successfully', async () => {
        const mockTasks = [{ id: 1, name: 'Student 1' }, { id: 2, name: 'Student 2' }];
        taskRepo.getTasks.mockImplementation((classId, callback) => {
            callback(null, mockTasks);
        });

        const classId = 1;
        const callback = jest.fn();

        taskRepo.getTasks(classId, callback);

        expect(callback).toHaveBeenCalledWith(null, mockTasks);
    });

    it('should handle errors when fetching students for the given class', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.getTasks.mockImplementation((classId, callback) => {
            callback(databaseError);
        });

        const classId = 1;
        const callback = jest.fn();

        taskRepo.getTasks(classId, callback);

        expect(callback).toHaveBeenCalledWith(databaseError);
    });
});
