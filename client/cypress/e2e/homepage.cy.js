import { slowCypressDown } from 'cypress-slow-down'

// slow down the testing process
//slowCypressDown();

describe("renders the home page", () => {
  beforeEach(() => {
    // load the home page
    cy.visit("/");
  });

  // after(() => {
  //   cy.visit("/");
  // })

  // login as a fuel station
  it("renders correctly", () => {
    //check if the given text included in this page
    cy.contains("Fast Fueler");

    let test_username = "6345263462";
    let test_password = "Abcd@1234";

    cy.get(".MuiTypography-alignRight > .MuiTypography-root").click();

    // enter username and password
    cy.get("#regNo").type(test_username).should("have.value", test_username);
    cy.get("#password").type(test_password).should("have.value", test_password);

    // click login button
    cy.get(".MuiButton-root").click();
  });

  // login as a personal client
  it("renders correctly", () => {
    //check if the given text included in this page
    cy.contains("Fast Fueler");

    let test_username = "990972657v";
    let test_password = "Abcd@1234";

    // enter username and password
    cy.get('#userid').type(test_username).should("have.value", test_username);
    cy.get("#password").type(test_password).should("have.value", test_password);

    // click login button
    cy.get(".MuiButton-root").click();
  });

  // login as an organization
  it("renders correctly", () => {
    //check if the given text included in this page
    cy.contains("Fast Fueler");

    let test_username = "org-565237627323";
    let test_password = "Abcd@1234";

    // enter username and password
    cy.get('#userid').type(test_username).should("have.value", test_username);
    cy.get("#password").type(test_password).should("have.value", test_password);

    // click login button
    cy.get(".MuiButton-root").click();
  });
});
