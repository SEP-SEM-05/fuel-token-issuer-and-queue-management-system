const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const Vehicle = require('../../../models/vehicle');
const {findVehicleByRegNo, findAllByNic, findAllByregistrationNoArray, updateStationsAndRegister} = require('../../../services/vehicleDBHelper');

describe("Database access methods for vehicles", () => {
    
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("findVehicleByRegNo - Find a vehicle that matches the given registration No.", () => {

        it("should return a null object for non exsisting registrtation No.", async () => {

            const vehicle = await findVehicleByRegNo('SP-AAA-7863');

            expect(vehicle).toEqual(null);
        });

        it("should return a valid vehicle object for an exsisting registration No.", async () => {

            const mockVehicle = {};

            const quriedVehicle = await findVehicleByRegNo('AAA-6756');

            expect(quriedVehicle).toEqual(mockVehicle);
        });
    });

    describe("findAllByNic - Find vehicles that registered under a given nic", () => {

        //checks whether the database has any vehicles under the given nic
        //if there are not, should return null
        it("should return a null object if there are no vehicles under the provided nic", async () => {

            const vehicle = await findAllByNic('997665667v');

            expect(vehicle).toEqual(null);
        });

        //checks whether the database has any vehicles under the given nic which are registered in the system
        //if there are not, should return null
        it("should return a null object if there are no vehicles registered in the system under the provided nic", async () => {

            const vehicle = await findAllByNic('997676667v');

            expect(vehicle).toEqual(null);
        });

        it("if there are vehicles registered under the given nic, return them in an array", async () => {

            const mockVehicles = [];

            const queriedVehicles = await findAllByNic('990998765v');

            expect(queriedVehicles).toEqual(mockVehicles);
        });
    });

    describe("findAllByregistrationNoArray - Find all the vehicles that the registraion No. is in the given array of registration numbers", () => {

        it("if the registration No. array is empty, should return a null object", async () => {

            const queriedVehicles = await findAllByregistrationNoArray([]);

            expect(queriedVehicles).toEqual(null);
        });

        it("should return an array with single vihicle object, if the regNo array contains only one registration No.", async () => {

            const regNos = ["sample regNO"];

            const queriedVehicles = await findAllByregistrationNoArray(regNos);

            expect(queriedVehicles.length).toEqual(1);
        });

        it("should return a vehicle objects array which has the length similar to the regNo array", async () => {

            const regNos = ["sample regNO1", "sample regNO2", "sample regNO3", "sample regNO4", ];

            const queriedVehicles = await findAllByregistrationNoArray(regNos);

            expect(queriedVehicles.length).toEqual(4);
        });
    });

    describe("updateStationsAndRegister - Given the a registration No. and an array of stations, update the stations of the vehicle and mark as registered", () => {

        // it("check whether the client is successfully saved", async () => {

        //     const mockClient = {};
        //     const mockData = {};

        //     const err = await saveClient(mockData);
        //     const quriedClient = await Personal.findOne({nic: mockData.nic});

        //     expect(quriedClient).toEqual(mockClient);
        // });
    });
});