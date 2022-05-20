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
      await request(app)
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

    test('POST /users shoud return 400 when posting a user with missing properties', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "email": "laura.fernandez@gmail.com",
      };
      const response = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Missing required user properties'
      });
    })

    test('POST /users shoud return 400 when posting a user with unnecesary properties', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "email": "laura.fernandez@gmail.com",
        "sex": "F",
        "age": 43,
        "phone": 1121636382,
        "favorite_food": "spaghetti"
      };
      const response = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Unnecesary properties'
      });
    })

    test('POST /users shoud return 400 when posting a user with invalid properties types', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "email": "laura.fernandez@gmail.com",
        "sex": "F",
        "age": 43,
        "phone": "1121636382"
      };
      const response = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Except for the phone and age, all fields should be strings'
      });
    })

    test('POST /users shoud return 400 when posting a user with invalid email', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "email": "emailInvalido$hotmail,com",
        "sex": "F",
        "age": 43,
        "phone": 1121636382
      };
      const response = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'invalid email'
      });
    })

    // test('POST /players shoud return 400 when posting a player with invalid position ', async () => {
    //   const playerData = {
    //     first_name: "Bronny",
    //     last_name: "James",
    //     position: "SG",
    //     team: {
    //       teamId: 26,
    //       full_name: "Sacramento Kings"
    //     }
    //   };
    //   const response = await request(app)
    //   .post('/v1/players')
    //   .set('x-api-key', process.env.API_KEY)
    //   .send(playerData)
    //   .expect('Content-Type', /json/)
    //   .expect(400); 
  
    //   expect(response.body).toStrictEqual({
    //     error: 'Invalid position - Choose one: G,F,C,G-F,F-C'
    //   });
    // })
    
    // test('POST /players shoud return 400 when posting a player with invalid team', async () => {
    //   const playerData = {
    //     first_name: "Bronny",
    //     last_name: "James",
    //     position: "G",
    //     team: {
    //       teamId: 40,
    //       full_name: "Seattle Supersonics"
    //     }
    //   };
    //   const response = await request(app)
    //   .post('/v1/players')
    //   .set('x-api-key', process.env.API_KEY)
    //   .send(playerData)
    //   .expect('Content-Type', /json/)
    //   .expect(400); 
  
    //   expect(response.body).toStrictEqual({
    //     error: 'Not matching team was found in the Id'
    //   });
    // })

  })
  
})

