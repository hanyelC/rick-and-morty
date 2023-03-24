import { ApiPatination, Character } from '@domain/entities'

export interface FetchCharactersGateway {
  fetchAll: (
    params?: FetchCharactersGateway.Request,
  ) => Promise<FetchCharactersGateway.Response>
}

export namespace FetchCharactersGateway {
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
