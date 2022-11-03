process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

//express app
const appMaker = require('../../../app');
const app = appMaker.makeApp();

// DB connection to test database
const conn = require('../../../db_connection');

// environmental variables
require('dotenv').config();

describe("Authentication endpoints", () => {
    
    beforeAll(async () => {

        // connect to mongodb and listen

        try {
            await conn.connect();
        } 
        catch (err) {
            console.log(err);
        }
    });

    afterAll(async () => {

        // close DB connection

        try {
            await conn.close();
        } 
        catch (err) {
            console.log(err);
        }
    });

    describe("/auth/registerPersonal - save a personal client to the database", () => {

        it("should return an error for exsisting email", async () => {

            const response = await request(app).post("/auth/registerPersonal").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        });

        it("should return an error for exsisting nic", async () => {

            // const response = await request(app).post("/auth/registerPersonal").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });

        it("should return status 'ok' if the user is successfully saved", async () => {

            // const response = await request(app).post("/auth/registerPersonal").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });
    });

    describe("/auth/registerOrg - save an organization to the database", () => {

        it("should return an error for an non-exsisting registration No.", async () => {

            // const response = await request(app).post("/auth/registerOrg").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });

        it("should return an error for for an already registered organization", async () => {

            // const response = await request(app).post("/auth/registerOrg").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });

        it("should return an error for exsisting email", async () => {

            // const response = await request(app).post("/auth/registerOrg").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });

        it("should return status 'ok' if the user is successfully saved", async () => {

            // const response = await request(app).post("/auth/registerOrg").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });
    });

    // describe("/auth/loginAdmin - authenticate admin user to login", () => {

    //     it("testcase description", async () => {

    //         // const response = await request(app).post("/auth/loginAdmin").send({
    //         //     username: "username",
    //         //     password: "password"
    //         // })
    //         // expect(response.statusCode).toBe(200)
    //     });
    // });

    // describe("/auth/loginPersonal - authenticate a personal client to login", () => {

    //     it("testcase description", async () => {

    //         // const response = await request(app).post("/auth/loginPersonal").send({
    //         //     username: "username",
    //         //     password: "password"
    //         // })
    //         // expect(response.statusCode).toBe(200)
    //     });
    // });

    // describe("/auth/loginOrg - authenticate an organization to login", () => {

    //     it("testcase description", async () => {

    //         // const response = await request(app).post("/auth/loginOrg").send({
    //         //     username: "username",
    //         //     password: "password"
    //         // })
    //         // expect(response.statusCode).toBe(200)
    //     });
    // });

    // describe("/auth/loginStation - authenticate a station login", () => {

    //     it("testcase description", async () => {

    //         // const response = await request(app).post("/auth/loginStation").send({
    //         //     username: "username",
    //         //     password: "password"
    //         // })
    //         // expect(response.statusCode).toBe(200)
    //     });
    // });
});