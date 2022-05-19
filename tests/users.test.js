const request = require('supertest');

require('dotenv').config();

const app = require('../src/app');
const { loadUsersData } = require('../src/models/users.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');

jest.setTimeout(1000000);

describe('Periodic Users API', () => {

  beforeAll( async () => {
    await mongoConnect(process.env.MONGO_TEST_URL);
    await loadUsersData();
  })

  afterAll(async () => {
    await mongoDisconnect();
  });


  describe('Login', () => {

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
  
  describe('Users API', () => {
    let accessToken;
    beforeAll(async () => {
      const response = await request(app)
      .post('/v1/login')
      .send({
        username: "fran_panozzo"
      })
      .expect('Content-Type', /json/)
      .expect(200); 
  
      accessToken = response.body.accessToken;
    });
  
    describe('GET /users', () => {
  
      test('GET /users should respond status 200', async () => {
        const response = await request(app)
        .get('/v1/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200); 
      })
  
      test('GET /users with the email as param should return 200 with the expected user', async () => {
        const response = await request(app)
        .get('/v1/users/francisco.panozzosf@gmail.com')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200); 
  
        const player = response.body; 
        expect(player.last_name).toBe('Panozzo');
      })

      test('GET /users/download should return 200 with a .csv file', async () => {
        await request(app)
        .get('/v1/users/download')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', 'text/csv; charset=utf-8')
        .expect(200); 
      })
    
    })

    describe('POST /users', () => {

      test('POST /players shoud return 201 created and return the stored ', async () => {
        const userData = {
          "first_name": "Laura",
          "last_name": "Fernandez",
          "email": "laura.fernandez@gmail.com",
          "sex": "F",
          "age": 43,
          "phone": 1121636382
        };
  
        const response = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201); 
    
        expect(response.body).toStrictEqual(userData);
      })

    })
  
  })
  
})

