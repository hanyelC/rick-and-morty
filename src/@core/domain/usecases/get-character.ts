import { Character } from '@domain/entities'

export interface GetCharacterUseCase {
  get: (
    params: GetCharacterUseCase.Request,
  ) => Promise<GetCharacterUseCase.Response>
}

export namespace GetCharacterUseCase {
  export type Request = {
    id: string
  }

  export type Response = {
    character: Character | null
  }
}
