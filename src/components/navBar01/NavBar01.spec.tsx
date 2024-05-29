describe("NavBar01-DeskTop", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("Navbar should render correctly", () => {
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.get('[data-test="header"]').should("be.visible");
  });

  it("Logo should render correctly", () => {
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.get('[data-test="logo"]').should("be.visible");
  });
  it("Link home should redirect to the home page when clicked", () => {
    cy.viewport(1280, 720);
    cy.get('[data-test="link-home"]').click();
    cy.url().should("match", /^http:\/\/localhost:5173\/$/);
  });
});

describe("NavBar01-Mobile", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should open and close navBar correctly", () => {
    cy.viewport(380, 720);
    cy.wait(2000);
    cy.get('[data-test="button-toggle"]')
      .should("not.have.class", "active")
      .click();
    cy.get('[data-test="link-home"]').contains("Home");
    cy.get('[data-test="button-toggle"]')
      .should("have.class", "active")
      .click();
  });
});
