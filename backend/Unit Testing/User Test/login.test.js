const request = require('supertest');
const router = require('../../Endpoint/Auth-End');
const taskRepo = require('../../Repository/Auth-Repo');

jest.mock('../../Repository/Auth-Repo', () => ({
  getUserByEmail: jest.fn()
}));

describe('POST /login', () => {
  it('responds with 400 if email or password are missing', async () => {
    const response = await request(router)
      .post('/login')
      .send({});
    expect(response.status).toBe(400);
  });

  it('responds with 404 if user is not found', async () => {
    taskRepo.getUserByEmail.mockImplementation((email, callback) => {
      callback(null, null);
    });
    const response = await request(router)
      .post('/login')
      .send({ email: 'nonexistent@example.com', password: 'password' });
    expect(response.status).toBe(404);
  });

  it('responds with 401 if password is invalid', async () => {
    taskRepo.getUserByEmail.mockImplementation((email, callback) => {
      callback(null, { email: 'existing@example.com', password: 'correctpassword' });
    });
    const response = await request(router)
      .post('/login')
      .send({ email: 'existing@example.com', password: 'incorrectpassword' });
    expect(response.status).toBe(401);
  });

  it('responds with 200 and tokens if login is successful', async () => {
    taskRepo.getUserByEmail.mockImplementation((email, callback) => {
      callback(null, { email: 'existing@example.com', password: 'correctpassword' });
    });
    const response = await request(router)
      .post('/login')
      .send({ email: 'existing@example.com', password: 'correctpassword' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('message', 'Login successful');
  });

  it('responds with 500 if an error occurs during login', async () => {
    taskRepo.getUserByEmail.mockImplementation((email, callback) => {
      callback(new Error('Database error'));
    });
    const response = await request(app)
      .post('/login')
      .send({ email: 'existing@example.com', password: 'correctpassword' });
    expect(response.status).toBe(500);
  });
});
