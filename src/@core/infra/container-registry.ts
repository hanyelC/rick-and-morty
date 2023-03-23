import 'reflect-metadata'
import { Container } from 'inversify'

import {
  FetchCharactersUseCase,
  GetCharacterUseCase,
} from '@application/usecases'
import { FakeCharacterGateway } from '@infra/gateways'

export const container = new Container()

export const Registry = {
  FetchCharactersGateway: Symbol.for('FetchCharactersGateway'),
  GetCharacterGateway: Symbol.for('GetCharacterGateway'),

  FetchCharactersUseCase: Symbol.for('FetchCharactersUseCase'),
  GetCharacterUseCase: Symbol.for('GetCharacterUseCase'),
}

// GATEWAYS
container
  .bind(Registry.FetchCharactersGateway)
  .toDynamicValue(() => new FakeCharacterGateway())
container
  .bind(Registry.GetCharacterGateway)
  .toDynamicValue(() => new FakeCharacterGateway())

// USE CASES
container.bind(Registry.FetchCharactersUseCase).toDynamicValue((context) => {
  return new FetchCharactersUseCase(
    context.container.get(Registry.FetchCharactersGateway),
  )
})
container.bind(Registry.GetCharacterUseCase).toDynamicValue((context) => {
  return new GetCharacterUseCase(
    context.container.get(Registry.GetCharacterGateway),
  )
})
