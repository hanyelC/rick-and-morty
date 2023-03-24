/// <reference types="cypress" />

// eslint-disable-next-line no-unused-vars
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.getByTestId('greeting')
     */
    // eslint-disable-next-line no-undef
    getByTestId(id: string): Chainable<JQuery<HTMLElement>>
  }
}
