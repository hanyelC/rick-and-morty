import { Character } from '@domain/entities'

export const characters: Character[] = [
  {
    id: '1',
    episodes: ['foo', 'baz'],
    gender: 'unknown',
    image: 'foo',
    name: 'Foo',
    origin: 'Earth',
    species: 'Human?',
    status: 'unknown',
  },
  {
    id: '2',
    episodes: ['lorem', 'ipsum'],
    gender: 'Female',
    image: 'foo',
    name: 'Baz',
    origin: 'Earth',
    species: 'Human',
    status: 'Alive',
  },
  {
    id: '3',
    episodes: ['a', 'b'],
    gender: 'Male',
    image: 'foo',
    name: 'Lorem ipsum',
    origin: 'Earth',
    species: 'Human',
    status: 'Dead',
  },
]
