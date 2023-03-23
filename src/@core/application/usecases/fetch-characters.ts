import { FetchCharactersGateway } from '@application/contracts'
import { FetchCharactersUseCase as IFetchCharactersUseCase } from '@domain/usecases'

export class FetchCharactersUseCase implements IFetchCharactersUseCase {
  constructor(
    private readonly fetchCharactersGateway: FetchCharactersGateway,
  ) {}

  async fetch(
    params?: IFetchCharactersUseCase.Request,
  ): Promise<IFetchCharactersUseCase.Response> {
    return await this.fetchCharactersGateway.fetchAll(params)
  }
}
