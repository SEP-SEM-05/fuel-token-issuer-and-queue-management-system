const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const Vehicle = require('../../../models/vehicle');
const Quota = require('../../../models/quota');
const Request = require('../../../models/request');

const { findVehicleByRegNo, findVehicleByRegNoAndEngNo, findAllByNic, findAllByregistrationNoArray, updateStationsAndRegister, registerAll, getQuotas, addToQueue, saveRequest, findWaitingRequest } = require('../../../services/vehicleDBHelper');

describe("Database access methods for vehicles", () => {

    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    // describe("findVehicleByRegNo - Find a vehicle that matches the given registration No.", () => {

    //     it("should return a null object for non exsisting registrtation No.", async () => {

    //         const vehicle = await findVehicleByRegNo('non-existing-regNo');

    //         expect(vehicle).toEqual(null);
    //     });

    //     it("should return a valid vehicle object for an exsisting registration No.", async () => {

    //         const exsistingRegNo = "sampleRegNo01";
    //         const mockVehicleId = "633ed6babc0b58545e91c3ee"

    //         const quriedVehicle = await findVehicleByRegNo(exsistingRegNo);

    //         expect(quriedVehicle._id).toEqual(mongoose.Types.ObjectId(mockVehicleId));
    //     });
    // });

    // describe("findVehicleByRegNoAndEngNo - find a vehicle given the registration No. and the engine No.", () => {

    //     it("should return a null object for non exsisting registrtation No.", async () => {

    //         const mockRegNo = "non-existing-regNo";
    //         const mockEngNo = "sampleEngNo01";

    //         const vehicle = await findVehicleByRegNoAndEngNo(mockRegNo, mockEngNo);

    //         expect(vehicle).toEqual(null);
    //     });

    //     it("should return a null object for non exsisting engine No.", async () => {

    //         const mockRegNo = "sampleRegNo01";
    //         const mockEngNo = "non-existing-engNo";

    //         const vehicle = await findVehicleByRegNoAndEngNo(mockRegNo, mockEngNo);

    //         expect(vehicle).toEqual(null);
    //     });

    //     it("should return a valid vehicle object for an exsisting registration No. and engine No.", async () => {

    //         const mockRegNo = "sampleRegNo01";
    //         const mockEngNo = "sampleEngNo01";
    //         const mockVehicleId = "633ed6babc0b58545e91c3ee";

    //         const vehicle = await findVehicleByRegNoAndEngNo(mockRegNo, mockEngNo);

    //         expect(vehicle._id).toEqual(mongoose.Types.ObjectId(mockVehicleId));
    //     });
    // });

    // describe("findAllByNic - Find vehicles that registered under a given nic", () => {

    //     //checks whether the database has any vehicles under the given nic
    //     //if there are not, should return null
    //     it("should return an empty array object if there are no vehicles under the provided nic", async () => {

    //         const mockNic = "non-existing-nic";

    //         const vehicles = await findAllByNic(mockNic);

    //         expect(vehicles).toEqual([]);
    //     });

    //     //checks whether the database has any vehicles under the given nic which are registered in the system
    //     //if there are not, should return null
    //     it("should return an empty array object if there are no vehicles registered in the system under the provided nic", async () => {

    //         const mockNic = "nicex01unreg";//this has vehicles owened by it. but those are not registered in the system

    //         const vehicles = await findAllByNic(mockNic);

    //         expect(vehicles).toEqual([]);
    //     });

    //     it("if there are vehicles registered under the given nic to the system, return them in an array", async () => {

    //         const mockNic = "657637925v";

    //         const vehicles = await findAllByNic(mockNic);

    //         expect(vehicles.length > 0).toBeTruthy();
    //     });
    // });

    // describe("findAllByregistrationNoArray - Find all the vehicles that the registraion No. is in the given array of registration numbers", () => {

    //     it("if the registration No. array is empty, should return a null object", async () => {

    //         const mockRegNos = [];

    //         const queriedVehicles = await findAllByregistrationNoArray(mockRegNos);

    //         expect(queriedVehicles).toEqual([]);
    //     });

    //     it("should return an array with single vihicle object, if the regNo array contains only one registration No.", async () => {

    //         const mockRegNos = ["sampleRegNo01"];

    //         const queriedVehicles = await findAllByregistrationNoArray(mockRegNos);

    //         expect(queriedVehicles.length).toEqual(1);
    //     });

    //     it("should return a vehicle objects array which has the length similar to the regNo array", async () => {

    //         const mockRegNos = ["sampleRegNo01", "sampleRegNo02", "sampleRegNo03", "sampleRegNo04", ];

    //         const queriedVehicles = await findAllByregistrationNoArray(mockRegNos);

    //         expect(queriedVehicles.length).toEqual(mockRegNos.length);
    //     });
    // });

    // describe("updateStationsAndRegister - Given the a registration No. and an array of stations, update the stations of the vehicle and mark as registered", () => {

    //     // it("check whether the client is successfully saved", async () => {

    //     //     const mockClient = {};
    //     //     const mockData = {};

    //     //     const err = await saveClient(mockData);
    //     //     const quriedClient = await Personal.findOne({nic: mockData.nic});

    //     //     expect(quriedClient).toEqual(mockClient);
    //     // });
    // });

    // describe("registerAll - register all the vehicles matches a given registration No. array", () => {

    //     it("no document should be updated, given an empty array", async () => {

    //         const mockRegNos = [];

    //         const result = await registerAll(mockRegNos);

    //         expect(result.modifiedCount).toEqual(mockRegNos.length);
    //     });

    //     it("should update(register) all the vehicles corresponds to the registration numbers provided in the array", async () => {

    //         const mockRegNos = ['sampleRegNo05', 'sampleRegNo03'];

    //         const result = await registerAll(mockRegNos);

    //         expect(result.modifiedCount).toEqual(mockRegNos.length);
    //     });
    // });

    // describe("getQuotas - get all allowed fuel quotas", () => {

    //     it("should return an array of quota objects", async () => {

    //         const result01 = await getQuotas();
    //         const result02 = await Quota.find();

    //         expect(result01.length).toEqual(result02.length);
    //     });
    // });

    // describe("addToQueue - add a fuel request to queues of all the station based on fuel type", () => {

    //     it("should return a null object for non exsisting registrtation No.", async () => {

    //         const vehicle = await findVehicleByRegNo('SP-AAA-7863');

    //         expect(vehicle).toEqual(null);
    //     });

    //     it("should return a valid vehicle object for an exsisting registration No.", async () => {

    //         const mockVehicle = {};

    //         const quriedVehicle = await findVehicleByRegNo('AAA-6756');

    //         expect(quriedVehicle).toEqual(mockVehicle);
    //     });
    // });

    // describe("saveRequest - save a fuel request to the database", () => {

    //     it("should return no error and a request document should able to be quried if the request has been successfully saved", async () => {

    //         const mockReq = {
    //             "userType": "personal",
    //             "registrationNo": "sampleRegNo01ex",
    //             "quota": 5,
    //             "fuelType": "Auto Diesel",
    //             "requestedStations": [
    //                 "stationRegNo01",
    //                 "stationRegNo02",
    //                 "stationRegNo03"
    //             ],
    //         };

    //         const result = await saveRequest(mockReq);
    //         const quriedRequest = await Request.findById(mongoose.Types.ObjectId(result));

    //         expect(quriedRequest).not.toEqual(result);
    //     });
    // });

    describe("findWaitingRequest - find any waiting/active requests for a vehicle/organization given the registration No.", () => {

        it("should return null if there are no waiting/active requests for regNo", async () => {

            const mockRegNo = "sampleRegNo03ex";
            const mockUserType = "personal";

            const requests = await findWaitingRequest(mockRegNo, mockUserType);

            expect(requests).toEqual(null);
        });

        it("should return a request object if there are any waiting/active requests for regNo", async () => {

            const mockRegNo = "sampleRegNo01ex";
            const mockUserType = "personal";

            const requests = await findWaitingRequest(mockRegNo, mockUserType);

            expect(requests).not.toEqual(null);
        });
    });
});

//remaining

//updateStationsAndRegister
// addToQueue