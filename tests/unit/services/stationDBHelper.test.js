const mongoose = require("mongoose");

// environmental variables
require("dotenv").config();
const dbURI = process.env.DB_URI;

const Personal = require("../../../models/station");
const {
    findStationByRegNo, findStationByID,
} = require("../../../services/stationDBHelper");

describe("Database access methods for fuel stations", () => {
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe("findStationByRegNo - Find a station bt its registration number", () => {
        it("should return a null object for non exsisting reg.no", async () => {
            const station = await findStationByRegNo("station99");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting reg.no", async () => {
            const quriedStation = await findClientByNic("station1");

            expect(quriedStation._id).toEqual(
                mongoose.Types.ObjectId("633ab4f95d62f03a23b978c5")
            );
        });
    });

    describe("findStationByID - Find a station by Mongoose ID", () => {
        it("should return a null object for non exsisting id", async () => {
            const station = await findStationByID("633ab4f95d62f03a23b988c5");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting id", async () => {
            const quriedClient = await findClientByID("633ab4f95d62f03a23b978c5");

            expect(quriedClient.registrationNo).toEqual("station1");
        });
    });

    describe("updateAmount - Update the fuel amount of a particular fuel type of a given station", () => {
        it("should return a null object for non exsisting id", async () => {
            const station = await findStationByID("633ab4f95d62f03a23b988c5");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting id", async () => {
            const quriedClient = await findClientByID("633ab4f95d62f03a23b978c5");

            expect(quriedClient.registrationNo).toEqual("station1");
        });
    });
});

//remaining

//saveRefreshToken,
//findAllRegisteredStations
