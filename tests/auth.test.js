const request = require('supertest');

require('dotenv').config();

const app = require('../src/app');
const { loadUsersData } = require('../src/models/users.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');

jest.setTimeout(1000000);

describe('Periodic authentication', () => {

  beforeAll( async () => {
    await mongoConnect(process.env.MONGO_TEST_URL);
    await loadUsersData();
  })

  afterAll(async () => {
    await mongoDisconnect();
  });


  test('tryning to do a request without logging in should respond 401', async () => {
    const response = await request(app)
    .get('/v1/users')
    .expect('Content-Type', "text/plain; charset=utf-8")
    .expect(401); 
  })

  test('tryning to do a request logged should should respond 200', async () => {
    const response = await request(app)
    .post('/v1/login')
    .send({
      username: "fran_panozzo"
    })
    .expect('Content-Type', /json/)
    .expect(200); 

    const accessToken = response.body.accessToken;
    console.log(`Access token is: ${accessToken}`);

    const response2 = await request(app)
      .get('/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200); 
  })
  
})