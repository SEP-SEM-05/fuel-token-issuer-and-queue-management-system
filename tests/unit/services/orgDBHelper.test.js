const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const Organization = require('../../../models/organization');
const {saveClient, findClientByRegNo, findClientByID} = require('../../../services/orgDBHelper');

describe("Database access methods for organizations", () => {
    
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    describe("saveClient - Save an organization to the database", () => {

        // it("should return an error with email field for already exsisting email address", async () => {

        //     const mockClient = {};
        //     const mockError = "";

        //     const err = await saveClient(mockClient);

        //     expect(err).toEqual(mockError);
        // });

        // it("should return an error with nic field for already exsisting nic", async () => {

        //     const mockClient = {};
        //     const mockError = "";

        //     const err = await saveClient(mockClient);

        //     expect(err).toEqual(mockError);
        // });

        // it("should return false if the client been successfully saved", async () => {

        //     const mockClient = {};

        //     const err = await saveClient(mockClient);

        //     expect(err).toEqual(false);
        // });

        // it("check whether the client is successfully saved", async () => {

        //     const mockClient = {};
        //     const mockData = {};

        //     const err = await saveClient(mockData);
        //     const quriedClient = await Personal.findOne({nic: mockData.nic});

        //     expect(quriedClient).toEqual(mockClient);
        // });
    });

    describe("findClientByRegNo - Find an organization by registrationNo.", () => {

        it("should return a null object for non exsisting registrationNo", async () => {

            const client = await findClientByRegNo('9929988750');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting registrationNo", async () => {

            const mockClient = {};

            const quriedClient = await findClientByRegNo('1544657956');

            expect(quriedClient).toEqual(mockClient);
        });
    });

    describe("findClientByID - Find an organization by Mongoose ID", () => {

        it("should return a null object for non exsisting id", async () => {

            const client = await findClientByID('sample _id');

            expect(client).toEqual(null);
        });

        it("should return a valid organization object for an exsisting id", async () => {

            const mockClient = {};

            const quriedClient = await findClientByID('exsisting _id');

            expect(quriedClient).toEqual(mockClient);
        });
    });

    describe("updateStations - Given the a registration No. and an array of stations, update the stations of the organization", () => {

        // it("check whether the client is successfully saved", async () => {

        //     const mockClient = {};
        //     const mockData = {};

        //     const err = await saveClient(mockData);
        //     const quriedClient = await Personal.findOne({nic: mockData.nic});

        //     expect(quriedClient).toEqual(mockClient);
        // });
    });
});