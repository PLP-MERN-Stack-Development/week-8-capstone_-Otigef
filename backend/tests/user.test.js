const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should hash the password before saving', async () => {
    const user = new User({ name: 'Test', email: 'test@example.com', password: 'secret' });
    await user.save();
    expect(await bcrypt.compare('secret', user.password)).toBe(true);
  });

  it('should compare passwords correctly', async () => {
    const user = new User({ name: 'Test2', email: 'test2@example.com', password: 'mypassword' });
    await user.save();
    const isMatch = await user.comparePassword('mypassword');
    expect(isMatch).toBe(true);
  });
}); 