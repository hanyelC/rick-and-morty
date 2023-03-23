import { GetCharacterGateway } from '@application/contracts'
import { GetCharacterUseCase as IGetCharacterUseCase } from '@domain/usecases'

export class GetCharacterUseCase implements IGetCharacterUseCase {
  constructor(private readonly getCharacterGateway: GetCharacterGateway) {}

  async get({
    id,
  }: IGetCharacterUseCase.Request): Promise<IGetCharacterUseCase.Response> {
    return await this.getCharacterGateway.getById({ id })
  }
}
