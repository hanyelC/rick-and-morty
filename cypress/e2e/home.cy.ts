describe('Home (e2)', () => {
  it('should have a valid header', () => {
    cy.visit('/')

    cy.get('header').contains('Rick and Morty')
  })
})
