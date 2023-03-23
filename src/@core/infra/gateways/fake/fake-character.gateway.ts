import { GetCharacterGateway } from '@application/contracts'
import { characters } from '@infra/data-sources/character'

export class FakeCharacterGateway implements GetCharacterGateway {
  async getById({
    id,
  }: GetCharacterGateway.Request): Promise<GetCharacterGateway.Response> {
    const character = characters.find((item) => item.id === id) ?? null

    return { character }
  }
}
