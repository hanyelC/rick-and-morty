describe('Character (e2e)', () => {
  it('should have a valid header', () => {
    cy.visit('/character/1')

    cy.get('header').contains('Rick and Morty')
  })

  it('should have character data', () => {
    cy.visit('/character/1')

    cy.get('h1').contains('Rick Sanchez')
  })
})
