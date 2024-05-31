const taskRepo = require('../../Repository/Auth-Repo'); 

jest.mock('../../Database', () => ({
    query: jest.fn(),
}));

const pool = require('../../Database'); 

describe('addStudent function', () => {
    it('should add a new student when there are no duplicate emails', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const callbackFn = jest.fn(); 

        taskRepo.addStudent('Nichole', 'alburo@gmail', 'classId', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM students WHERE email = ?',
            ['alburo@gmail'], 
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(null, expect.any(Object));
    });

    it('should return a duplicate error when trying to add a student with an existing email', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, [{ email: 'alburo@gmail' }]); 
        });

        const callbackFn = jest.fn(); 

        taskRepo.addStudent('Nichole', 'alburo@gmail', 'classId', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM students WHERE email = ?',
            ['alburo@gmail'],
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(expect.any(Error));
        expect(callbackFn.mock.calls[0][0].statusCode).toBe(409);
    });
});
