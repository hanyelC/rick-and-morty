import { Card } from '@/components/Card'
import { mockCardProps } from './mocks/card-props'

describe('<Card />', () => {
  it('should render and display expected content', () => {
    const props = mockCardProps()

    cy.mount(<Card {...props} />)

    cy.getByTestId('name').contains('name: ' + props.name)
    cy.getByTestId('gender').contains('gender: ' + props.gender)
    cy.getByTestId('origin').contains('origin: ' + props.origin)
    cy.getByTestId('species').contains('species: ' + props.species)
    cy.getByTestId('status').contains('status: ' + props.status)
    cy.getByTestId('image')
      .should('have.attr', 'src')
      .and('match', /_next\/image/)
    cy.getByTestId('more-details-link').contains('More details')
    cy.getByTestId('more-details-link').should(
      'have.attr',
      'href',
      props.redirectUrl,
    )
  })
})
