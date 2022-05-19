const request = require('supertest');

require('dotenv').config();

const app = require('../src/app');
const { loadUsersData } = require('../src/models/users.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');

jest.setTimeout(1000000);

describe('Players API', () => {
  beforeAll(async () => {
    await mongoConnect(process.env.MONGO_TEST_URL);
    await loadUsersData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('GET /users', () => {

    test('GET /users should respond status 200', async () => {
      const response = await request(app)
      .get('/v1/users')
      .expect('Content-Type', /json/)
      .expect(200); 
    })
  
  })

})
