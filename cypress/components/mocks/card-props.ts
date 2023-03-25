import { Props } from '@/components/Card'

export const mockCardProps = (): Props => {
  return {
    gender: 'fake-gender',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'fake-name',
    origin: 'fake-origin',
    redirectUrl: 'fake-redirectUrl',
    species: 'fake-species',
    status: 'unknown',
  }
}
