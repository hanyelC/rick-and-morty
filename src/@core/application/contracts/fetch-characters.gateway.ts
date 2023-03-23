import { Character } from '@domain/entities'

export interface FetchCharactersGateway {
  fetchAll: (
    params?: FetchCharactersGateway.Request,
  ) => Promise<FetchCharactersGateway.Response>
}

export namespace FetchCharactersGateway {
  export type Request = {}

  export type Response = {
    characters: Character[]
  }
}
