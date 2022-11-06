import { slowCypressDown } from 'cypress-slow-down'

// slow down the testing process
slowCypressDown();

describe("renders the home page", () => {
    before(() => {
        // load the home page
        cy.visit("/");

        let test_username = "6345263462";
        let test_password = "Abcd@1234";

        // login as a fuel station
        cy.get(".MuiTypography-alignRight > .MuiTypography-root").click();

        // enter username and password
        cy.get("#regNo")
          .type(test_username)
          .should("have.value", test_username);
        cy.get("#password")
          .type(test_password)
          .should("have.value", test_password);

        // click login button
        cy.get(".MuiButton-root").click();
    });

  it("add new fuel amount", () => {

    let test_wrong_fuel_amount = -12;
    let test_fuel_amount = 10;

    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click();

    cy.get("#amount").type(test_wrong_fuel_amount).should("have.value", test_wrong_fuel_amount);

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    cy.get("#amount").clear();

    cy.get("#amount").type(test_fuel_amount).should("have.value", test_fuel_amount);

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
  });

  it("announce a fuel queue", () => {

    let test_wrong_fuel_amount = -12;
    let test_fuel_amount = 200;

    cy.get('.css-12tyqda > [href="/fuelstation/fuelqueues"]').click();
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click();

    cy.get("#fuelAmount")
      .type(test_fuel_amount)
      .should("have.value", test_fuel_amount);
    cy.get("#startDateTime").type("2022-11-10T10:00");
    cy.get("#avgTime").type(10);
    cy.get("#estEndTime > .MuiChip-label").click();
    cy.get(":nth-child(6) > .MuiButtonBase-root").click();
  });


});
