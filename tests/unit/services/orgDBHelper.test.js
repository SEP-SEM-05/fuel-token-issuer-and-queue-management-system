const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const Organization = require('../../../models/organization');
const {saveClient, findClientByRegNo, findClientByID, updateStations} = require('../../../services/orgDBHelper');

describe("Database access methods for organizations", () => {
    
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    afterAll(async () => {
        await mongoose.disconnect();
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

            const result = await saveClient(mockRegNo ,mockClient);

            expect(result.modifiedCount).toEqual(1);
        });
    });

    describe("findClientByRegNo - Find an organization by registrationNo.", () => {

        it("should return a null object for non exsisting registrationNo", async () => {

            const client = await findClientByRegNo('non-existing regNo');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting registrationNo", async () => {

            const quriedClient = await findClientByRegNo('mockRegNo999');

            expect(quriedClient._id).toEqual(mongoose.Types.ObjectId("6335c554d94e2a08227ac7b2"));
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

    describe("updateStations - Given the a registration No. and an array of stations, update the stations of the organization", () => {

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
            let quriedClient = await Organization.findOne({registrationNo: mockRegNo});

            expect(quriedClient.stations).toEqual(mockStations);
        });
    });
});