const jwt = require('jsonwebtoken');
require('dotenv').config();

const { requireAuth, accessTokenVerify, refreshTokenVerify, createAccessToken, createRefreshToken } = require('../../../middleware/auth');

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const ACCESS_EXP = process.env.ACCESS_EXP;
const REFRESH_EXP = process.env.REFRESH_EXP;

describe("auth middleware check", () => {

    beforeAll(async () => {});

    afterAll(async () => {});

    // describe("requireAuth - Verifies that a request header contains a valid token", () => {

    //     it("should return false if in text credential does not match", async () => {

    //         const randomCredential = "Abc@123";
    //         const encryptedCredential = "$2a$12$f5F/Rhg66uL0Mf/gBSfrEuv29f6QEjCrmLe8oa7HfpwW1i2et6bfq";

    //         const result = await checkEncryptedCredential(randomCredential, encryptedCredential);

    //         expect(result).toEqual(false);
    //     });

    //     it("should return true if in text credential matches", async () => {

    //         const randomCredential = "Abcd@1234";
    //         const encryptedCredential = "$2a$12$f5F/Rhg66uL0Mf/gBSfrEuv29f6QEjCrmLe8oa7HfpwW1i2et6bfq";

    //         const result = await checkEncryptedCredential(randomCredential, encryptedCredential);

    //         expect(result).toEqual(true);
    //     });
    // });

    describe("accessTokenVerify - verifies the validity of a given access token", () => {

        it("should return an error for an invalid token", async () => {

            let invalid_token = "hdcwevuwveuvwueuwevyu7233vf23fgi2ufi2f";

            const result = accessTokenVerify(invalid_token);

            expect(result.status).toEqual("auth-error");
        });

        it("should return a 'ok' status and a new access token for a valid token", async () => {

            let token_value = {id: "some_id"};
            let valid_token = jwt.sign(token_value, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_EXP });;

            const result = accessTokenVerify(valid_token);

            expect(result.status).toEqual("ok");
            expect(result.hasOwnProperty('newAccessToken')).toBeTruthy();
        });
    });

    describe("refreshTokenVerify - verifies the validity of a given refresh token", () => {

        it("should return an error for an invalid token", async () => {

            let invalid_token = "hdcwevuwveuvwueuwevyu7233vf23fgi2ufi2f";

            const result = await refreshTokenVerify(invalid_token);

            expect(result.status).toEqual("auth-error");
            expect(result.error).toEqual("Invalid/expired token!");
        });

        it("if the userType is provided as admin with a wrong username, should return an error", async () => {

            let token_value = {
                userType: "admin",
                useranme: "something"
            };
            let valid_token = jwt.sign(token_value, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_EXP });;

            const result = await refreshTokenVerify(valid_token);

            expect(result.status).toEqual("auth-error");
            expect(result.error).toEqual("Invalid token!");
        });

        it("if the userType is provided as admin with the correct admin username, should return a 'ok' status with a new access token", async () => {

            let token_value = {
                userType: "admin",
                username: process.env.ADMIN_USERNAME
            };
            let valid_token = jwt.sign(token_value, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_EXP });;

            const result = await refreshTokenVerify(valid_token);

            expect(result.status).toEqual("ok");
            expect(result.hasOwnProperty('newAccessToken')).toBeTruthy();
        });

        it("if the userType is non-existing, should return an error", async () => {

            let token_value = {
                userType: "something"
            };
            let valid_token = jwt.sign(token_value, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_EXP });;

            const result = await refreshTokenVerify(valid_token);

            expect(result.status).toEqual("auth-error");
            expect(result.error).toEqual("Invalid token!");
        });

        // it("if the id is non-existing for any userType(except admin), should return an error", async () => {

        //     let userTypes = ["personal", "organization", "station"];
        //     let token_value = {
        //         // userType: userTypes[Math.floor(Math.random() * 3 )],
        //         userType: "personal",
        //         id: "633ed6babc0b58545e91c3ee"
        //     };
        //     let valid_token = jwt.sign(token_value, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_EXP });;

        //     const result = await refreshTokenVerify(valid_token);
        //     // console.log(result)
        //     expect(result.status).toEqual("error");
        //     expect(result.error).toEqual("Invalid token!");
        // });

        // it("for an existing id, should return the status 'ok' with a new access token", async () => {

        //     let userTypes = ["personal", "organization", "station"];
        //     let token_value = {
        //         // userType: userTypes[Math.floor(Math.random() * 3 )],
        //         userType: "personal",
        //         id: "633ed6babc0b58545e91c3ee"
        //     };
        //     let valid_token = jwt.sign(token_value, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_EXP });;

        //     const result = await refreshTokenVerify(valid_token);

        //     expect(result.status).toEqual("ok");
        //     expect(result.hasOwnProperty('newAccessToken')).toBeTruthy();
        // });
    });

    describe("createAccessToken - returns an encrypted access token containing the provided data", () => {

        it("the return token should contain the provided data", async () => {

            let data = {id: "some_id"};

            const token = createAccessToken(data);

            jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {

                let expected_data = decodedToken;

                expect(expected_data.id).toEqual(data.id);
            });
        });
    });

    describe("createRefreshToken - returns an encrypted refresh token containing the provided data", () => {

        it("the return token should contain the provided data", async () => {

            let data = {id: "some_id"};

            const token = createRefreshToken(data);

            jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, (err, decodedToken) => {

                let expected_data = decodedToken;

                expect(expected_data.id).toEqual(data.id);
            });
        });
    });
});

//remaining

// requireAuth,
// refreshTokenVerify