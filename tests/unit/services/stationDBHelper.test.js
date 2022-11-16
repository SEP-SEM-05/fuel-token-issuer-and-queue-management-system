process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();

// DB connection to test database
const conn = require('../../../db_connection');

const Station = require("../../../models/station");
const {
    saveRefreshToken, findStationByRegNo, findAnyStationByRegNo, findStationByID, findAllRegisteredStations, findAllUnregisteredStations, countRegisteredStations, findAllNewlyregisteredStations, registerAllStation, registerStation, updateAmount, updateLastAnnounced, updateStationState, saveTempPass, getStartStation,
} = require("../../../services/stationDBHelper");

describe("Database access methods for fuel stations", () => {

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

    describe("findStationByRegNo - Find a station bt its registration number", () => {
        it("should return a null object for non exsisting reg.no", async () => {
            const station = await findStationByRegNo("station99");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting reg.no", async () => {
            const quriedStation = await findStationByRegNo("6345263462");

            expect(quriedStation.registrationNo).toEqual("6345263462");
        });
    });

    describe("findAnyStationByRegNo - Find a station by its registration number", () => {
        it("should return a null object for non exsisting reg.no", async () => {
            const station = await findAnyStationByRegNo("station99");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting reg.no", async () => {
            const quriedStation = await findAnyStationByRegNo("6345263462");

            expect(quriedStation.registrationNo).toEqual("6345263462");
        });
    });

    describe("findStationByID - Find a station by Mongoose ID", () => {
        it("should return a null object for non exsisting id", async () => {
            const station = await findStationByID("633ab4f95d62f03a23b988c5");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting id", async () => {
            const quriedClient = await findStationByRegNo("6345263462");

            expect(quriedClient.registrationNo).toEqual("6345263462");
        });
    });

    describe("findAllRegisteredStations - get all registered stations", () => {

        it("should return an array of registered stations", async () => {

            const quriedStations = await findAllRegisteredStations();

            expect(quriedStations.length >= 0).toEqual(true);
        });
    });

    describe("findAllUnregisteredStations - get all unregistered stations", () => {

        it("should return an array of unregistered stations", async () => {

            const quriedStations = await findAllUnregisteredStations();

            expect(quriedStations.length >= 0).toEqual(true);
        });
    });

    describe("findAllNewlyregisteredStations - get all newlyregistered stations", () => {

        it("should return an array of newly registered stations", async () => {

            const quriedStations = await findAllNewlyregisteredStations();

            expect(quriedStations.length >= 0).toEqual(true);
        });
    });

    describe("countRegisteredStations - get count of each type of registered stations", () => {
        it("should return a null object for non existing type", async () => {
            const stationCount = await countRegisteredStations("non-existing-type");

            expect(stationCount).toEqual(0);
        });

        it("should return station count for an exsisting station type", async () => {
            const quriedCount = await countRegisteredStations("ioc");

            expect(quriedCount > 0).toBeTruthy();

        });
    });

    describe("registerStation - register as newly registered station", () => {

        it("should return a null object for non exsisting reg.no", async () => {
            const station = await registerStation("station99");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting reg.no", async () => {
            const quriedStation = await registerStation("6345263462");

            expect(quriedStation.registrationNo).toEqual("6345263462");
        });
    });

    describe("updateAmount - update the fuel amount, given the fuel type", () => {

        it("should update the amount of given fuel type of the given station", async () => {

            const result = await updateAmount("testOnlyStation", "Auto Diesel", 50);
            expect(result === null).toEqual(false);
        });
    });

    describe("updateLastAnnounced - update last announced time", () => {

        it("should update the last announced time of the station", async () => {

            const result = await updateLastAnnounced("testOnlyStation", "Auto Diesel", "2022/12/12");
            expect(result === null).toEqual(false);
        });
    });

    describe("updateStationState - update the station as ongoing station", () => {

        it("should return a null object for non exsisting reg.no", async () => {
            const station = await updateStationState("station99");

            expect(station).toEqual(null);
        });

        it("should return a valid station object for an exsisting reg.no", async () => {
            const quriedStation = await updateStationState("6345263462");

            expect(quriedStation.registrationNo).toEqual("6345263462");
        });
    });

    describe("saveTempPass - save station temp password", () => {

        it("should save the provided tempory password to the statioin", async () => {

            const pass = "$2a$12$wn7cso3y66MOr30mo66jFeEHBmhEU6fC/x/FRXfcZe/LpuDInW2gu";
            const result = await saveTempPass("testOnlyStation", pass);
            expect(result === null).toEqual(false);
        });
    });

    describe("getStartStation - get start station", () => {

        it("should save the provided password to the statioin and register it", async () => {

            const pass = "$2a$12$wn7cso3y66MOr30mo66jFeEHBmhEU6fC/x/FRXfcZe/LpuDInW2gu";
            const result = await getStartStation("testOnlyNewStation", pass);
            expect(result === null).toEqual(false);
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

// registerAllStation,
