const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

const {saveClient, findClientByRegNo, findClientByID} = require('../../../services/orgDBHelper');

describe("organization check", () => {
    
    beforeAll(async () => {
        // connect to mongodb and listen
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    });

    // it("should find a document matches to the regNo", async () => {
    //     const vehicle = await findVehicleByRegNo('AAA-6756');
    //     expect(vehicle).toEqual(null);
    // });
});