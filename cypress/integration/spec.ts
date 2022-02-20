describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Contacts Manager')
  })
})
describe('Contact Form Tests', () => {
  it('the user can create contact', () => {
    cy.visit(' http://localhost:56567/')
    cy.get('#create-btn').click();
    cy.get('#fc-first-name').type('Jane')
    cy.get('#fc-last-name').type('Doe')
    cy.get('#fc-phone').type('0885987521222')
    cy.get('#fc-address').type('Paris, France')
    cy.get('#fc-iban').type('DE22500105175172485417')
    cy.get('#update-btn').click()

    cy.contains('Contact successfully created').should('be.visible')
  })
})