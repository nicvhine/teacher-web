const taskRepo = require('../../Repository/Auth-Repo'); 

jest.mock('../../Database', () => ({
    query: jest.fn(),
}));

const pool = require('../../Database'); 

describe('addUser function', () => {
    it('should add a new user when there are no duplicate emails', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, []);
        }, 10000);

        const callback = jest.fn(); 

        taskRepo.addUser('test@example.com', 'password', callback);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM users WHERE email = ?',
            ['test@example.com'],
            expect.any(Function)
        );

        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            ['test@example.com', 'password'],
            expect.any(Function)
        );

        expect(callback).toHaveBeenCalledWith(null, expect.any(Object));
    });

    it('should return a duplicate error when trying to add a user with an existing email', () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, [{ email: 'test@example.com' }]);
        }, 10000);

        const callback = jest.fn(); 

        taskRepo.addUser('test@example.com', 'password', callback);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM users WHERE email = ?',
            ['test@example.com'],
            expect.any(Function)
        );

        expect(callback).toHaveBeenCalledWith(expect.any(Error));
        expect(callback.mock.calls[0][0].statusCode).toBe(409);
    });

});
