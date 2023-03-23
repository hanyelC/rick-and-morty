export type Character = {
  id: string
  episodes: string[]
  gender: Character.Gender
  image: string
  name: string
  origin: string
  species: string
  status: Character.Status
}

export namespace Character {
  export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

  export type Status = 'Alive' | 'Dead' | 'unknown'
}
