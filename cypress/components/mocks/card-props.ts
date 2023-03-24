import { Props } from '@/components/Card'

export const mockCardProps = (): Props => {
  return {
    gender: 'gender',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'name',
    origin: 'origin',
    redirectUrl: 'redirectUrl',
    species: 'species',
    status: 'status',
  }
}
