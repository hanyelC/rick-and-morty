import { Character } from '@domain/entities'

export interface FetchCharactersUseCase {
  fetch: (
    params?: FetchCharactersUseCase.Request,
  ) => Promise<FetchCharactersUseCase.Response>
}

export namespace FetchCharactersUseCase {
  export type Request = {}

  export type Response = {
    characters: Character[]
  }
}
