process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();

// DB connection to test database
const conn = require('../../../db_connection');

const Quota = require('../../../models/quota');

const { findQuotaByFuelType, updateQuota } = require('../../../services/quotaDBHelper');

describe("Database access methods for quotas", () => {
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

    describe("findQuotaByFuelType - Find vehicle quota for a given fuel type", () => {

        //checks whether the database has any quota for the given fuel type
        //if there are not, should return null
        it("should return an empty array object if there are no quota for the mentioned fuel type", async () => {

            const mockType = "non-existing-type";

            const quotas = await findQuotaByFuelType(mockType);

            expect(quotas).toEqual([]);
        });

        it("if there are quotas for the given fuel type, return them in an array", async () => {

            const mockType = "Diesel";

            const quotas = await findQuotaByFuelType(mockType);

            expect(quotas.length > 0).toBeTruthy();
        });
    });
});