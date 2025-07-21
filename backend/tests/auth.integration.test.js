const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Integration Test', email: 'integration@test.com', password: 'test123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('integration@test.com');
  });
}); 