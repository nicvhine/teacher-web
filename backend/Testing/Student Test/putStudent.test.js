const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    updateStudentStatus: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('PUT /class/:classId/students/:studentId/status', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should update student status successfully', async () => {
        const mockResult = { affectedRows: 1 }; 
        taskRepo.updateStudentStatus.mockImplementation((studentId, status, callback) => {
            callback(null, mockResult);
        });

        const response = await request(app)
            .put('/class/1/students/123/status')
            .send({ status: 'active' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Student status updated successfully' });
    });

    it('should return 500 if there is an error updating student status', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.updateStudentStatus.mockImplementation((studentId, status, callback) => {
            callback(databaseError);
        });

        const response = await request(app)
            .put('/class/1/students/123/status')
            .send({ status: 'active' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to update student status' });
    });

    it('should return 400 if status is missing', async () => {
        const response = await request(app)
            .put('/class/1/students/123/status')
            .send({}); 

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Status is required' });
    });
});
