const taskRepo = require('../../Repository/Auth-Repo');
jest.mock('../../Database', () => ({
    query: jest.fn(),
}));
const pool = require('../../Database');

describe('addTasks function', () => {
    it('should add a new task when there are no duplicate title and description', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const callbackFn = jest.fn(); 

        taskRepo.addTasks('Stitle', 'Sdescription', 'Sdue_date', 'classId', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM tasks WHERE title = ? AND description = ?',
            ['Stitle', 'Sdescription'], 
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(null, expect.any(Object));
    });

    it('should return a duplicate error when trying to add a task with an existing title and description', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, [{ title: 'Stitle', description: 'Sdescription' }]); 
        });

        const callbackFn = jest.fn(); 

        taskRepo.addTasks('Stitle', 'Sdescription', 'Sdue_date', 'classId', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM tasks WHERE title = ? AND description = ?',
            ['Stitle', 'Sdescription'],
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(expect.any(Error));
        expect(callbackFn.mock.calls[0][0].statusCode).toBe(409);
    });
});
