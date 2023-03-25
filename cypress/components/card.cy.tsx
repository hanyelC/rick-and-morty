import { Card } from '@/components/Card'
import { mockCardProps } from './mocks/card-props'

describe('<Card />', () => {
  it('should render and display expected content', () => {
    const props = mockCardProps()

    cy.mount(<Card {...props} />)

    cy.getByTestId('name').contains(props.name)
    cy.getByTestId('gender').contains('gender: ' + props.gender)
    cy.getByTestId('origin').contains('origin: ' + props.origin)
    cy.getByTestId('status')
      .get('span')
      .contains(`${props.status} - ${props.species}`)

    cy.getByTestId('image')
      .should('have.attr', 'src')
      .and('match', /_next\/image/)
    cy.getByTestId('more-details-link').should(
      'have.attr',
      'href',
      props.redirectUrl,
    )
  })
})
