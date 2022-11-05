describe("renders the home page", () => {
    beforeEach(() => {
        // load the home page
        cy.visit("/");
    });

  it("renders correctly", () => {
    

    //check if the given text included in this page
    cy.contains("Fast Fueler");

    let test_username = "6345263462";
    let test_password = "Abcd@1234";

    // login as a fuel station
    cy.get(".MuiTypography-alignRight > .MuiTypography-root").click();
    
    // enter username and password
    cy.get("#regNo").type(test_username).should("have.value", test_username);
    cy.get("#password").type(test_password).should("have.value", test_password);

    // click login button
    cy.get(".MuiButton-root").click();




  });
});
