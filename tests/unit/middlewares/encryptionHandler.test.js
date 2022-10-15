const bcrypt = require('bcrypt');

const {checkEncryptedCredential, encryptCredential} = require('../../../middleware/encryptionHandler');

describe("encryption middleware check", () => {
    
    beforeAll(async () => {});

    afterAll(async () => {});

    describe("checkEncryptedCredential - Check whether an in text credential matches the encrypted credential", () => {

        it("should return false if in text credential does not match", async () => {

            const randomCredential = "Abc@123";
            const encryptedCredential = "$2a$12$f5F/Rhg66uL0Mf/gBSfrEuv29f6QEjCrmLe8oa7HfpwW1i2et6bfq";

            const result = await checkEncryptedCredential(randomCredential, encryptedCredential);

            expect(result).toEqual(false);
        });

        it("should return true if in text credential matches", async () => {

            const randomCredential = "Abcd@1234";
            const encryptedCredential = "$2a$12$f5F/Rhg66uL0Mf/gBSfrEuv29f6QEjCrmLe8oa7HfpwW1i2et6bfq";

            const result = await checkEncryptedCredential(randomCredential, encryptedCredential);

            expect(result).toEqual(true);
        });
    });

    describe("encryptCredential - return an encrypted string, given an in text credential", () => {

        it("the return value should not match with a different in text credential", async () => {

            const randomCredential = "Abcd@1234";
            const randomCredential2 = "Abc@123";

            const encryptedCredential = await encryptCredential(randomCredential);
            const decryptionResult = await bcrypt.compare(randomCredential2, encryptedCredential);

            expect(decryptionResult).toEqual(false);
        });

        it("the return value should match with the encrypted string using bcrypt", async () => {

            const randomCredential = "Abcd@1234";

            const encryptedCredential = await encryptCredential(randomCredential);
            const decryptionResult = await bcrypt.compare(randomCredential, encryptedCredential);

            expect(decryptionResult).toEqual(true);
        });
    });
});