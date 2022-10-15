process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

//express app
const appMaker = require('../../../app');
const app = appMaker.makeApp();

// DB connection to test database
// const conn = require('../../../db/index.js');

// environmental variables
require('dotenv').config();

describe("Authentication endpoints", () => {
    
    beforeAll(async () => {

        // connect to mongodb and listen

        // try {
        //     await conn.connect();
        // } 
        // catch (err) {
        //     console.log(err);
        // }
    });

    afterAll(async () => {

        // close DB connection

        // try {
        //     await conn.close();
        // } 
        // catch (err) {
        //     console.log(err);
        // }
    });

    describe("endpoint - endpoint description", () => {

        it("testcase description", async () => {

            // const response = await request(app).post("/users").send({
            //     username: "username",
            //     password: "password"
            // })
            // expect(response.statusCode).toBe(200)
        });
    });
});