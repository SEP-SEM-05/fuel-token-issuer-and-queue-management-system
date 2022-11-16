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

    describe("Personal Login - Authenticate personal client to login to the system", () => {

        it('ERROR: Should return an authentication error for wrong Credentials', (done) => {

            request(app).post('/auth/loginPersonal')
                .send({ nic: 'someNic', password: "somePassword" })
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

            const nic = "testonlypersonal01";
            const psw = "Abcd@1234";
            
            request(app).post('/auth/loginPersonal')
                .send({ nic: nic, password: psw })
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    expect(body).to.contain.property('data');

                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe("Organization Login - Authenticate an organization to login to the system", () => {

        it('ERROR: Should return an authentication error for wrong Credentials', (done) => {

            request(app).post('/auth/loginOrg')
                .send({ registrationNo: 'someRegNo', password: "somePassword" })
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

            const registrationNo = "testOnlyOrg01";
            const psw = "Abcd@1234";
            
            request(app).post('/auth/loginOrg')
                .send({ registrationNo: registrationNo, password: psw })
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    expect(body).to.contain.property('data');

                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe("Station Login - Authenticate a fuel station to login to the system", () => {

        it('ERROR: Should return an authentication error for wrong Credentials', (done) => {

            request(app).post('/auth/loginStation')
                .send({ registrationNo: 'someRegNo', password: "somePassword" })
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

            const registrationNo = "testOnlyNewStation";
            const psw = "Abcd@1234";
            
            request(app).post('/auth/loginStation')
                .send({ registrationNo: registrationNo, password: psw })
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    expect(body).to.contain.property('data');

                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe("Personal Register - Add a new personal client to the system", () => {

        it('ERROR: Should return an error for already exsisting email address', (done) => {

            const mockNic = Date.now().toString().substring(2); //random
            const mockExistingEmail = "Jaunita84@yahoo.com";
            const mockClient = {
                "nic": mockNic,
                "fname": "firstName",
                "lname": "lastName",
                "password": "Abcd@1234",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockExistingEmail
            };

            request(app).post('/auth/registerPersonal')
                .send(mockClient)
                .then((res) => {

                    const body = res.body;
                    
                    expect(body.status).to.equal('error');
                    expect(body).to.contain.property('error');
                    expect(res.statusCode).to.equal(400);

                    done();
                })
                .catch((err) => done(err));
        });

        it('ERROR: Should return an error for already exsisting nic', (done) => {

            const mockExistingNic = "990972657v";
            const mockEmail = Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com"; //random
            const mockClient = {
                "nic": mockExistingNic,
                "fname": "firstName",
                "lname": "lastName",
                "password": "Abcd@1234",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockEmail
            };

            request(app).post('/auth/registerPersonal')
                .send(mockClient)
                .then((res) => {

                    const body = res.body;
                    
                    expect(body.status).to.equal('error');
                    expect(body).to.contain.property('error');
                    expect(res.statusCode).to.equal(400);

                    done();
                })
                .catch((err) => done(err));
        });

        it('SUCCESS: Should return usertype of the user for a successfull register', (done) => {

            const mockNic = Date.now().toString().substring(2); //random
            const mockEmail = Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com"; //random
            const mockClient = {
                "nic": mockNic,
                "fname": "firstName",
                "lname": "lastName",
                "password": "Abcd@1234",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockEmail
            };
            
            request(app).post('/auth/registerPersonal')
                .send(mockClient)
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    expect(body).to.contain.property('data');

                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe("Organization Register - Save an organization as registered", () => {

        it('ERROR: Should return an error for an already registered registration No.', (done) => {

            const mockRegNo = "sampleRegNo999"
            const mockClient = {
                "registrationNo": mockRegNo,
                "name": "sampleOrgName",
                "password": "Abcd@1234",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com",
                "stations": [
                    "283648236846",
                    "237223873872"
                ]
            };
            
            request(app).post('/auth/registerOrg')
                .send(mockClient)
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('error');
                    expect(body).to.contain.property('error');

                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe("Station Get Stand - Save a fuel station as registered", () => {

        it('SUCCESS: Should return usertype of the user for a successfull register', (done) => {

            const mockStation = {
                "regNo": "testOnlyNewStation",
                "password": "Abcd@1234",
                "tempPassword": "Abcd@1234"
            };
            
            request(app).post('/auth/getStandStation')
                .send(mockStation)
                .then((res) => {

                    const body = res.body;

                    expect(body.status).to.equal('ok');
                    expect(body).to.contain.property('userType');
                    expect(body).to.contain.property('data');

                    done();
                })
                .catch((err) => done(err));
        });
    });
});