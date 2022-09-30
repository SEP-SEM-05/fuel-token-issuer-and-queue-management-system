const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const Personal = require('../../../models/personal');
const {saveClient, findClientByNic, findClientByID, } = require('../../../services/personalDBHelper');

describe("Database access methods for personal clients", () => {
    
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("saveClient - Save a personal client to the database", () => {

        it("should return an error with email field for already exsisting email address", async () => {

            const mockClient = {};
            const mockError = "";

            const err = await saveClient(mockClient);

            expect(err).toEqual(mockError);
        });

        it("should return an error with nic field for already exsisting nic", async () => {

            const mockClient = {};
            const mockError = "";

            const err = await saveClient(mockClient);

            expect(err).toEqual(mockError);
        });

        it("should return false if the client been successfully saved", async () => {

            const mockClient = {};

            const err = await saveClient(mockClient);

            expect(err).toEqual(false);
        });

        it("check whether the client is successfully saved", async () => {

            const mockClient = {};
            const mockData = {};

            const err = await saveClient(mockData);
            const quriedClient = await Personal.findOne({nic: mockData.nic});

            expect(quriedClient).toEqual(mockClient);
        });
    });

    describe("findClientByNic - Find a personal client by NIC", () => {

        it("should return a null object for non exsisting nic", async () => {

            const client = await findClientByNic('992998875v');

            expect(client).toEqual(null);
        });

        it("should return a valid personal client object for an exsisting nic", async () => {

            const mockClient = {};

            const quriedClient = await findClientByNic('998662567v');

            expect(quriedClient).toEqual(mockClient);
        });
    });

    describe("findClientByID - Find a personal client by Mongoose ID", () => {

        it("should return a null object for non exsisting id", async () => {

            const client = await findClientByID('sample _id');

            expect(client).toEqual(null);
        });

        it("should return a valid personal client object for an exsisting id", async () => {

            const mockClient = {};

            const quriedClient = await findClientByID('exsisting _id');

            expect(quriedClient).toEqual(mockClient);
        });
    });
});