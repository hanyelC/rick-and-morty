import {
  FetchCharactersGateway,
  GetCharacterGateway,
} from '@application/contracts'
import { characters } from '@infra/data-sources/character'

export class FakeCharacterGateway
  implements GetCharacterGateway, FetchCharactersGateway
{
  async fetchAll(
    params?: FetchCharactersGateway.Request,
  ): Promise<FetchCharactersGateway.Response> {
    return {
      characters,
      pagination: {
        count: characters.length,
        next: null,
        pages: 1,
        prev: null,
      },
    }
  }

  async getById({
    id,
  }: GetCharacterGateway.Request): Promise<GetCharacterGateway.Response> {
    const character = characters.find((item) => item.id === id) ?? null

    return { character }
  }
}
