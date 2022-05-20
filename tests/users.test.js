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

    test('GET /users to an unexisting respond status 404', async () => {
      const response = await request(app)
      .get('/v1/users/lorenzo.giovanni@hotmail.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(404); 

      expect(response.body).toStrictEqual({
        error: 'User not found'
      })
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

    test('POST /users shoud respnse 400 when posting a user with invalid email', async () => {
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

  })

  describe('DELETE /users', () => {

    test('DELETE /users should response 404 when tryng to delete an unexisting user', async () => {
      await request(app)
      .delete('/v1/users/andrea.gomez@gmail.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(404);
    })

    test('DELETE /players should response 200 when tring to delete someone and succesfully delete it', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "email": "laura.fernandez@gmail.com",
        "sex": "F",
        "age": 43,
        "phone": 1121636382
      };

      const response = await request(app)
      .delete(`/v1/users/laura.fernandez@gmail.com`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

      expect(response.body).toStrictEqual({
        ok: `User with email laura.fernandez@gmail.com succesfully deleted`
      });

      const response2 = await request(app)
      .get(`/v1/users/laura.fernandez@gmail.com`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(404);

      expect(response2.body).toStrictEqual({
        error: `User not found`
      });
    })

  })

  describe('UPDATE /users', () => {

    test('UPDATE /users should return 404 when trying to update an unexisting user', async () => {
      const userData = {
        "first_name": "Laura",
        "last_name": "Fernandez",
        "sex": "F",
        "age": 43,
        "phone": 1121636382
      };
      
      await request(app)
      .patch('/v1/users/laura.fernandez@gmail.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(404);
    })

    test('UPDATE /users should return 200 when trying to update someone and successfully updated it', async () => {
      const userData = {
        "age": 22,
        "something": "some"
      }
      
      await request(app)
      .patch('/v1/users/francisco.panozzosf@gmail.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200);

      const response = await request(app)
      .get('/v1/users/francisco.panozzosf@gmail.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200); 

      expect(response.body.age).toBe(22);
      expect(Object.keys(response.body).length).toBe(6);
    })

  })
  
})

