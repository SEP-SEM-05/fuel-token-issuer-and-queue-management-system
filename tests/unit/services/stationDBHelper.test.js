const mongoose = require("mongoose");
const Station = require("../../../models/station");

// environmental variables
require("dotenv").config();
const dbURI = process.env.DB_URI;

const Personal = require("../../../models/station");
const {
    saveRefreshToken, findStationByRegNo, findStationByID,
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
            const quriedStation = await findStationByRegNo("station1");

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
            const quriedClient = await findStationByID("633ab4f95d62f03a23b978c5");

            expect(quriedClient.registrationNo).toEqual("station1");
        });
    });

    describe("updateAmount - Update the fuel amount of a particular fuel type of a given station", () => {
        it("should return a null object for non exsisting id", async () => {
            const station = await findStationByID("633ab4f95d62f03a23b988c5");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting id", async () => {
            const quriedClient = await findStationByID("633ab4f95d62f03a23b978c5");

            expect(quriedClient.registrationNo).toEqual("station1");
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

            const mockId = "633ab4f95d62f03a23b978c5";
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6Im9yZ2FuaXphdGlvbiIsImlkIjoiNjMzNThiODQ2OTg4MjZmZjZhYTYxMzYwIiwicmVnaXN0cmF0aW9uTm8iOiI1NjUyMzc2MjczMjMiLCJpYXQiOjE2NjQ4NzUzODksImV4cCI6MTY2NDk2MTc4OX0.F_dM8F_1BtlV0DsA5juWO2rE7KD_gzf2XrNfEsyBU1E";

            let result = await saveRefreshToken(mockToken, mockId);
            let quriedClient = await Station.findById(mongoose.Types.ObjectId(mockId));

            expect(quriedClient.refreshToken).toEqual(mockToken);
        });
    });
});

//remaining

//findAllRegisteredStations
