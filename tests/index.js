process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const makeApp = require('../app');
const app = makeApp();
const conn = require('./mockDBConfig');

describe('POST /notes', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, creating a new personal client', (done) => {
    request(app).post('/auth/registerPersonal')
      .send({
        "nic": '273232727237',
        "firstName": "firstName",
        "lastName": "lastName",
        "password": "Abcd@1234",
        "contactNo": "2837363682823",
        "address": "119/2, sample, address",
        "email": Date.now().toString(36) + Math.random().toString(36).substr(2) + "@example.com"
    })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('status');
        expect(body).to.contain.property('token');
        expect(body).to.contain.property('userType');
        done();
      })
      .catch((err) => done(err));
  });

//   it('Fail, note requires text', (done) => {
//     request(app).post('/notes')
//       .send({ name: 'NOTE' })
//       .then((res) => {
//         const body = res.body;
//         expect(body.errors.text.name)
//           .to.equal('ValidatorError')
//         done();
//       })
//       .catch((err) => done(err));
//   });
})

// "test": "jest",
// "test_force_exit": "jest --forceExit",
// "test_detectOpenHandles": "jest --detectOpenHandles",
// "test_mocha": "mocha --recursive --exit"