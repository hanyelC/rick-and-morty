import { Character } from '@domain/entities'

export interface GetCharacterGateway {
  getById: (
    params: GetCharacterGateway.Request,
  ) => Promise<GetCharacterGateway.Response>
}

export namespace GetCharacterGateway {
  export type Request = {
    id: string
  }

  export type Response = {
    character: Character | null
  }
}
