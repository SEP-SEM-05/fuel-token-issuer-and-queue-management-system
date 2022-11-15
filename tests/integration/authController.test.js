//#####use await######

process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const appMaker = require('../../app');
const app = appMaker.makeApp();
const conn = require('../../db_connection');

describe('Authentication endpoints', () => {

    beforeAll(async () => {

        // connect to mongodb and listen

        try {
            await conn.connect();
        }
        catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {

        // close DB connection

        try {
            await conn.close();
        }
        catch (err) {
            console.log(err);
        }
    })

    describe("Admin Login - Authenticate admin to login to the system", () => {

        it('ERROR: Should return an authentication error for wrong Credentials', (done) => {

            request(app).post('/auth/loginAdmin')
                .send({ username: 'someUserName', password: "somePassword" })
                .then((res) => {
                    const body = res.body;
                    expect(body.status).to.equal('error');
                    expect(body).to.contain.property('error');
                    expect(res.statusCode).to.equal(400);
                    done();
                })
                .catch((err) => done(err));
        });

        it('SUCCESS: Should return usertype of the user for correct credentials', (done) => {

            const admin_username = process.env.ADMIN_USERNAME;
            const admin_psw = process.env.ADMIN_PASSWORD;

            request(app).post('/auth/loginAdmin')
                .send({ username: admin_username, password: admin_psw })
                .then((res) => {
                    const body = res.body;
                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    done();
                })
                .catch((err) => done(err));
        });
    });
});