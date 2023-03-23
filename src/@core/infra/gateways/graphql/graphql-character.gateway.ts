import {
  FetchCharactersGateway,
  GetCharacterGateway,
} from '@application/contracts'
import { Character } from '@domain/entities'

import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'

export class GraphqlCharacterGateway
  implements FetchCharactersGateway, GetCharacterGateway
{
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {}

  private mapCharacterResultToEntity(data: any): Character {
    return {
      id: data.id,
      episodes: data.episode?.map((ep: any) => `${ep.episode} - ${ep.name}`),
      gender: data.gender,
      image: data.image,
      name: data.name,
      origin: data.origin.name,
      species: data.species,
      status: data.status,
    }
  }

  async fetchAll(
    params?: FetchCharactersGateway.Request,
  ): Promise<FetchCharactersGateway.Response> {
    const { data } = await this.apolloClient.query({
      query: gql`
        query ListCharacters {
          characters {
            info {
              count
              next
              pages
              prev
            }
            results {
              id
              gender
              name
              image
              species
              status
              origin {
                name
              }

              episode {
                name
                episode
              }
            }
          }
        }
      `,
    })

    const { results } = data.characters

    const characters = results.map(this.mapCharacterResultToEntity)

    return { characters }
  }

  async getById({
    id,
  }: GetCharacterGateway.Request): Promise<GetCharacterGateway.Response> {
    const { data } = await this.apolloClient.query({
      query: gql`
        query getCharacter($characterId: ID!) {
          character(id: $characterId) {
            id
            gender
            name
            image
            species
            status
            origin {
              name
            }

            episode {
              name
              episode
            }
          }
        }
      `,
      variables: {
        characterId: id,
      },
    })

    const character = this.mapCharacterResultToEntity(data.character)

    return { character }
  }
}
