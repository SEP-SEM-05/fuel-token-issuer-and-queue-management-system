const jwt = require('jsonwebtoken');
require('dotenv').config();

const {requireAuth, createToken} = require('../../../middleware/auth');

describe("auth middleware check", () => {
    
    beforeAll(async () => {});

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

    describe("createToken - return an encrypted token containing the created time", () => {

        it("the return token should contain the today date", async () => {

            let date_obj = new Date(Date.now());

            const token = createToken();

            jwt.verify(token, process.env.JWT_ENV, (err, decodedToken) => {

                let expected_date_obj = new Date(decodedToken.value);

                expect(expected_date_obj).toEqual(date_obj);
            });
        });
    });
});