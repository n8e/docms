var docMan = require('../server/routes/api'),
  express = require('express'),
  faker = require('faker');

var app = express();
var request = require('supertest')(app);

var user = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: '12345',
    email: faker.internet.email(),
    username: faker.internet.userName(),
    role: 'User'
  },
  authToken, userId, url = 'http://localhost:3000';

// describe("User", function() {
//   it("validates that a new user created is unique", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that a new user created has a role defined", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that a new user created both first and last names", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that all users are returned when getAllUsers is called.", function() {
//     expect(true).toBe(true);
//   });
// });

// describe("Role", function() {
//   it("validates that a new role created has a unique title", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that all documents are returned, limited by a specified number, when getAllDocuments is called", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called", function() {
//     expect(true).toBe(true);
//   });
// });

// describe("Search", function() {
//   it("validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called", function() {
//     expect(true).toBe(true);
//   });

//   it("validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called", function() {
//     expect(true).toBe(true);
//   });
// });


describe('POST /api/users', function() {
  it('should show that a new user is created', function(done) {
    request
      .post(url + '/api/users')
      .send(user)
      .end(function(err, res) {
        var response = JSON.parse(res.text);
        if (res.status === 200) {
          userId = response._id;
          expect(res.type).toBe('application/json');
          expect(typeof response).toBe('object');
          expect(response.success).toEqual(true);
          expect(response.username).toEqual(user.username);
          expect(response.role).toEqual(user.role);
          expect(response.name.first).toEqual(user.firstname);
          expect(response.name.last).toEqual(user.lastname);
          expect(typeof response.password).toBe('string');
        } else {
          expect(res.status).toBe(400);
          expect(response.error).toBe('User not created');
        }
        done();
      });
  });
});


// describe('GET api/users', function() {
//   it('should respond with json', function(done) {
//     request
//       .get('/api/users')
//       .set('Accept', 'application/json');
//   });
// });

describe('GET /', function() {
  it('should respond with json', function(done) {
    request
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8', done);
  });
});
