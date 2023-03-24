import { ApiPatination, Character } from '@domain/entities'

export interface FetchCharactersUseCase {
  fetch: (
    params?: FetchCharactersUseCase.Request,
  ) => Promise<FetchCharactersUseCase.Response>
}

export namespace FetchCharactersUseCase {
  export type Request = {
    filter?: {
      name?: string
      gender?: Character.Gender
      status?: Character.Status
    }
    page?: number
  }

  export type Response = {
    characters: Character[]
    pagination: ApiPatination
  }
}
