describe('Site Loads Normally', () => {
  it('should allow the user to select a totally random episode', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    //Click the random episode button
    cy.get(':nth-child(3) > .btn').click()

    // Land on the episode picker
    cy.get('.display-6').contains('Episode Picker')

    // There should be an image
    cy.get('img').should('exist')

    // There should be a recommendation
    cy.get('.fs-5').contains('you should watch')

    // There should be a shuffle button
    cy.get('.btn-primary').contains('Shuffle').click()

    // There should be a details button
    cy.get('.btn-outline-primary').contains('Details').click()

    // There should be a back button
    cy.get('.d-flex > .text-muted').contains('Back to home').click()

    // Kill it
    cy.end()
  })
})

export {}
