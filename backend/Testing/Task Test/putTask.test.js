const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    updateTaskStatus: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('PUT /class/:classId/tasks/:id/status', () => {
    it('should update task status successfully', async () => {
        const taskId = 1;
        const classId = 1;
        const mockResult = { affectedRows: 1 };
        taskRepo.updateTaskStatus.mockImplementation((id, status, callback) => {
            callback(null, mockResult);
        });
    
        const response = await request(app)
            .put(`/class/${classId}/tasks/${taskId}/status`)
            .send({ status: 'completed' });
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Student status updated successfully' });
    });
    
    it('should return 500 if there is an error updating task status', async () => {
        const taskId = 1;
        const classId = 1;
        const databaseError = new Error('Database error occurred.');
        taskRepo.updateTaskStatus.mockImplementation((id, status, callback) => {
            callback(databaseError);
        });
    
        const response = await request(app)
            .put(`/class/${classId}/tasks/${taskId}/status`)
            .send({ status: 'completed' });
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to update student status' }); 
    });
    
    it('should return 400 if status is missing', async () => {
        const taskId = 1;
        const classId = 1;
    
        const response = await request(app)
            .put(`/class/${classId}/tasks/${taskId}/status`)
            .send({});
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Status is required' });
    });
});    
