const taskRepo = require('../../Repository/Auth-Repo');
jest.mock('../../Database', () => ({
    query: jest.fn(),
}));
const pool = require('../../Database');

describe('addClass function', () => {
    it('should add a new class when there are no duplicate details', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        });

        const callbackFn = jest.fn(); 

        taskRepo.addClass('Name', 'Description', 'Group', 'StartYear', 'EndYear', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM classes WHERE name = ? AND `group` = ?',
            ['Name', 'Group'], 
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(null, expect.any(Object));
    });

    it('should return a duplicate error when trying to add a class with an existing name and group', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, [{ name: 'Name', group: 'Group' }]); 
        });

        const callbackFn = jest.fn(); 

        taskRepo.addClass('Name', 'Description', 'Group', 'StartYear', 'EndYear', callbackFn);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM classes WHERE name = ? AND `group` = ?',
            ['Name', 'Group'],
            expect.any(Function)
        );

        expect(callbackFn).toHaveBeenCalledWith(expect.any(Error));
        expect(callbackFn.mock.calls[0][0].statusCode).toBe(409);
    });
});
