import { GetCharacterGateway } from '@application/contracts'
import { characters } from '@infra/data-sources/character'

export class FakeCharacterGateway implements GetCharacterGateway {
  async getById(
    params: GetCharacterGateway.Request,
  ): Promise<GetCharacterGateway.Response> {
    return {
      character: characters[0],
    }
  }
}
