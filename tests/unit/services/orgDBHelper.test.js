process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();

// DB connection to test database
const conn = require('../../../db_connection');

const Organization = require('../../../models/organization');
const { saveClient, saveRefreshToken, findClientByRegNo, findOrgByRegNo, findClientByID, updateStations, updateFullQuotas, findAllClient, updateFillingDetails } = require('../../../services/orgDBHelper');

describe("Database access methods for organizations", () => {

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

    describe("saveClient - Save an organization to the database", () => {

        it("should update the document based on the registration No. with the provided validated data", async () => {

            const mockRegNo = "sampleRegNo999"
            const mockClient = {
                "registrationNo": mockRegNo,
                "name": "sampleOrgName",
                "password": "$2a$12$zXIzE0x2Eq1t8J06Bt6YF.9PawV5dV81HHbWy3kdkfyPQCY8rvqVy",
                "contactNo": "2837363682823",
                "address": "119/2, sample, address",
                "email": Date.now().toString(36) + Math.random().toString(36).substring(2) + "@example.com",
                "stations": [
                    "283648236846",
                    "237223873872"
                ]
            };

            const result = await saveClient(mockRegNo, mockClient);

            expect(result.modifiedCount).toEqual(1);
        });
    });

    describe("findClientByRegNo - Find a registered organization by registrationNo.", () => {

        it("should return a null object for non exsisting registrationNo", async () => {

            const client = await findClientByRegNo('non-existing regNo');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting registrationNo", async () => {

            const quriedClient = await findClientByRegNo('mockRegNo999');

            expect(quriedClient._id).toEqual(mongoose.Types.ObjectId("6335c554d94e2a08227ac7b2"));
        });
    });

    describe("findOrgByRegNo - Find an organization by registrationNo.", () => {

        it("should return a null object for non exsisting registrationNo", async () => {

            const client = await findOrgByRegNo('non-existing regNo');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting registrationNo", async () => {

            const quriedClient = await findOrgByRegNo('mockRegNo999');

            expect(quriedClient._id).toEqual(mongoose.Types.ObjectId("6335c554d94e2a08227ac7b2"));
        });
    });

    describe("findAllClient - Get all the organizations", () => {

        it("should return an array of organizations", async () => {

            const quriedClients = await findAllClient();

            expect(quriedClients.length > 0).toEqual(true);
        });
    });

    describe("findClientByID - Find an organization by Mongoose ID", () => {

        it("should return a null object for non exsisting id", async () => {

            const client = await findClientByID('0335c554d94e2a08227ac7b0');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting id", async () => {

            const quriedClient = await findClientByID("6335c554d94e2a08227ac7b2");

            expect(quriedClient.registrationNo).toEqual("mockRegNo999");
        });
    });

    describe("updateStations - Given a registration No. and an array of stations, update the stations of the organization", () => {

        it("should fail to update any document for an invalid registration No.", async () => {

            const mockRegNo = "mockRegNo111";
            const mockStations = ['stationRegNo01', 'stationRegNo02'];

            let result = await updateStations(mockRegNo, mockStations);

            expect(result.matchedCount).toEqual(0);
        });

        it("should update the stations of a particular organization with provided stations array for a valid registration No.", async () => {

            const mockRegNo = "mockRegNo999";
            const mockStations = ['stationRegNo01', 'stationRegNo02'];

            let result = await updateStations(mockRegNo, mockStations);
            let quriedClient = await Organization.findOne({ registrationNo: mockRegNo });

            expect(quriedClient.stations).toEqual(mockStations);
        });
    });

    describe("saveRefreshToken - Given a token and an id, update the refresh token of a organization", () => {

        it("should fail to update any document for an invalid id", async () => {

            const mockId = "0335c554d94e2a08227ac7b0";
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6Im9yZ2FuaXphdGlvbiIsImlkIjoiNjMzNThiODQ2OTg4MjZmZjZhYTYxMzYwIiwicmVnaXN0cmF0aW9uTm8iOiI1NjUyMzc2MjczMjMiLCJpYXQiOjE2NjQ4NzUzODksImV4cCI6MTY2NDk2MTc4OX0.F_dM8F_1BtlV0DsA5juWO2rE7KD_gzf2XrNfEsyBU1E";

            let result = await saveRefreshToken(mockToken, mockId);

            expect(result.matchedCount).toEqual(0);
        });

        it("should update the refresh token for a valid id", async () => {

            const mockId = "63358b84698826ff6aa61360";
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6Im9yZ2FuaXphdGlvbiIsImlkIjoiNjMzNThiODQ2OTg4MjZmZjZhYTYxMzYwIiwicmVnaXN0cmF0aW9uTm8iOiI1NjUyMzc2MjczMjMiLCJpYXQiOjE2NjQ4NzUzODksImV4cCI6MTY2NDk2MTc4OX0.F_dM8F_1BtlV0DsA5juWO2rE7KD_gzf2XrNfEsyBU1E";

            let result = await saveRefreshToken(mockToken, mockId);
            let quriedClient = await Organization.findById(mongoose.Types.ObjectId(mockId));

            expect(quriedClient.refreshToken).toEqual(mockToken);
        });
    });

    describe("updateFullQuotas - update the full fuel quotas, given the registrationNo.", () => {

        it("should fail to update any document for an invalid registration No.", async () => {

            const mockRegNo = "mockRegNo111";
            const mockQuotas = [30, 50];

            let result = await updateFullQuotas(mockRegNo, mockQuotas);

            expect(result.matchedCount).toEqual(0);
        });

        it("should update the stations of a particular organization with provided stations array for a valid registration No.", async () => {

            const mockRegNo = "mockRegNo999";
            const mockQuotas = [30, 50];

            let result = await updateFullQuotas(mockRegNo, mockQuotas);
            let quriedClient = await Organization.findOne({ registrationNo: mockRegNo });

            expect(quriedClient.fullQuotas).toEqual(mockQuotas);
        });
    });
});


// updateFillingDetails,