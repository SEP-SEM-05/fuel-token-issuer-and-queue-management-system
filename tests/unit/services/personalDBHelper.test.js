process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();

// DB connection to test database
const conn = require('../../../db_connection');

const Personal = require('../../../models/personal');
const {saveClient, saveRefreshToken, findClientByNic, findClientByID, findAllClient } = require('../../../services/personalDBHelper');

describe("Database access methods for personal clients", () => {
    
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

    describe("saveClient - Save a personal client to the database", () => {

        it("should return an error with email field for already exsisting email address", async () => {

            const mockNic = Date.now().toString().substring(2); //random
            const mockExistingEmail = "Jaunita84@yahoo.com";
            const mockClient = {
                "nic": mockNic,
                "firstName": "firstName",
                "lastName": "lastName",
                "password": "$2a$12$zXIzE0x2Eq1t8J06Bt6YF.9PawV5dV81HHbWy3kdkfyPQCY8rvqVy",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockExistingEmail
            };

            try {
                const result = await saveClient(mockClient);
            }
            catch (err) {
                expect(err.keyValue).toEqual({ email: 'Jaunita84@yahoo.com' });
            }
        });

        it("should return an error with nic field for already exsisting nic", async () => {

            const mockExistingNic = "990972657v";
            const mockEmail = Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com"; //random
            const mockClient = {
                "nic": mockExistingNic,
                "firstName": "firstName",
                "lastName": "lastName",
                "password": "$2a$12$zXIzE0x2Eq1t8J06Bt6YF.9PawV5dV81HHbWy3kdkfyPQCY8rvqVy",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockEmail
            };

            try {
                const result = await saveClient(mockClient);
            }
            catch (err) {
                expect(err.keyValue).toEqual({ nic: '990972657v' });
            }
        });

        it("should return no error and the document should able to be quried if the client has been successfully saved", async () => {

            const mockNic = Date.now().toString().substring(2); //random
            const mockEmail = Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com"; //random
            const mockClient = {
                "nic": mockNic,
                "firstName": "firstName",
                "lastName": "lastName",
                "password": "$2a$12$zXIzE0x2Eq1t8J06Bt6YF.9PawV5dV81HHbWy3kdkfyPQCY8rvqVy",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": mockEmail
            };

            const result = await saveClient(mockClient);
            const quriedClient = await Personal.findOne({nic: mockNic});

            expect(quriedClient.nic).toEqual(mockNic);
            expect(quriedClient._id).toEqual(result);
        });
    });

    describe("findClientByNic - Find a personal client by NIC", () => {

        it("should return a null object for non exsisting nic", async () => {

            const client = await findClientByNic('992998875v');

            expect(client).toEqual(null);
        });

        it("should return a valid personal client object for an exsisting nic", async () => {

            const quriedClient = await findClientByNic('990972657v');

            expect(quriedClient._id).toEqual(mongoose.Types.ObjectId("63357dc8ceafb5f66452a7ac"));
        });
    });

    describe("findClientByID - Find a personal client by Mongoose ID", () => {

        it("should return a null object for non exsisting id", async () => {

            const client = await findClientByID('0335c554d94e2a08227ac7b0');

            expect(client).toEqual(null);
        });

        it("should return a valid personal client object for an exsisting id", async () => {

            const quriedClient = await findClientByID('63357dc8ceafb5f66452a7ac');

            expect(quriedClient.nic).toEqual("990972657v");
        });
    });

    describe("saveRefreshToken - Given a token and an id, update the refresh token of a personal client", () => {

        it("should fail to update any document for an invalid id", async () => {

            const mockId = "0335c554d94e2a08227ac7b0";
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InBlcnNvbmFsIiwiaWQiOiI2MzM1N2RjOGNlYWZiNWY2NjQ1MmE3YWMiLCJuaWMiOiI5OTA5NzI2NTd2IiwiaWF0IjoxNjY0ODc1Mjg0LCJleHAiOjE2NjQ5NjE2ODR9.1mISW-4U117RH1SNW7l1geAF2kgFXBy-SNcgLXcYN20";

            let result = await saveRefreshToken(mockToken, mockId);

            expect(result.matchedCount).toEqual(0);
        });

        it("should update the refresh token for a valid id", async () => {

            const mockId = "63357dc8ceafb5f66452a7ac";
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InBlcnNvbmFsIiwiaWQiOiI2MzM1N2RjOGNlYWZiNWY2NjQ1MmE3YWMiLCJuaWMiOiI5OTA5NzI2NTd2IiwiaWF0IjoxNjY0ODc1Mjg0LCJleHAiOjE2NjQ5NjE2ODR9.1mISW-4U117RH1SNW7l1geAF2kgFXBy-SNcgLXcYN20";

            let result = await saveRefreshToken(mockToken, mockId);
            let quriedClient = await Personal.findById(mongoose.Types.ObjectId(mockId));

            expect(quriedClient.refreshToken).toEqual(mockToken);
        });
    });

    describe("findAllClient - Get all the personal clients", () => {

        it("should return an array of organizations", async () => {

            const quriedClients = await findAllClient();

            expect(quriedClients.length > 0).toEqual(true);
        });
    });
});