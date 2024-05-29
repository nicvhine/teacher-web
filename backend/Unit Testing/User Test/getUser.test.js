const taskRepo = require('../../Repository/Auth-Repo');
const pool = require('../../Database');

jest.mock('../../Database', () => {
    const mockQuery = jest.fn();
    return {
        query: mockQuery
    };
});

describe('getUsers function', () => {
    
    it('should fetch users successfully', () => {
        const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
        pool.query.mockImplementation((sql, callback) => {
            callback(null, mockUsers);
        });

        const callback = jest.fn(); 

        taskRepo.getUsers(callback);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM users',
            expect.any(Function)
        );

        expect(callback).toHaveBeenCalledWith(null, mockUsers);
    });

    it('should handle errors when fetching users', () => {
        const errorMessage = 'Database connection error';
        pool.query.mockImplementation((sql, callback) => {
            callback(new Error(errorMessage));
        });

        const callback = jest.fn(); 

        taskRepo.getUsers(callback);

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM users',
            expect.any(Function)
        );

        expect(callback).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
