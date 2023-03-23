import { Character } from '@domain/entities'

export const characters: Character[] = [
  {
    id: '1',
    episodes: ['foo', 'baz'],
    gender: 'unknown',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'Rick',
    origin: 'Earth',
    species: 'Human',
    status: 'unknown',
  },
  {
    id: '2',
    episodes: ['lorem', 'ipsum'],
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    name: 'Morty',
    origin: 'Earth',
    species: 'Human',
    status: 'Alive',
  },
  {
    id: '3',
    episodes: ['a', 'b'],
    gender: 'Female',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    name: 'Summer Smith',
    origin: 'Earth',
    species: 'Human',
    status: 'Dead',
  },
]
