const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Database', () => ({
    query: jest.fn()
}));

jest.mock('../../Repository/Auth-Repo', () => ({
    getStudentCountForClass: jest.fn(),
    getStudentsForClass: jest.fn()
}));

app.use(express.json());
app.use('/', router);

describe('GET /class/:id/studentCount', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return the count of students for the given class', async () => {
        const mockCount = 5;
        taskRepo.getStudentCountForClass.mockImplementation((id, callback) => {
            callback(null, mockCount);
        });

        const response = await request(app).get('/class/1/studentCount');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ studentCount: mockCount });
    });

    it('should return 500 if there is an error fetching student count', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.getStudentCountForClass.mockImplementation((id, callback) => {
            callback(databaseError);
        });

        const response = await request(app).get('/class/1/studentCount');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch student count' });
    });
});

describe('getStudentsForClass', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should fetch students for the given class successfully', async () => {
        const mockStudents = [{ id: 1, name: 'Student 1' }, { id: 2, name: 'Student 2' }];
        taskRepo.getStudentsForClass.mockImplementation((classId, callback) => {
            callback(null, mockStudents);
        });

        const classId = 1;
        const callback = jest.fn();

        taskRepo.getStudentsForClass(classId, callback);

        expect(callback).toHaveBeenCalledWith(null, mockStudents);
    });

    it('should handle errors when fetching students for the given class', async () => {
        const databaseError = new Error('Database error occurred.');
        taskRepo.getStudentsForClass.mockImplementation((classId, callback) => {
            callback(databaseError);
        });

        const classId = 1;
        const callback = jest.fn();

        taskRepo.getStudentsForClass(classId, callback);

        expect(callback).toHaveBeenCalledWith(databaseError);
    });
});
