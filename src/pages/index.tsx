import { Button } from '@/components/Button'
import styles from '../styles/pages/home.module.css'
import { Card } from '@/components/Card'
import { ApiPatination, Character } from '@domain/entities'
import { FetchCharactersUseCase } from '@domain/usecases'
import { Registry, container } from '@infra/container-registry'

import Pagination from '@mui/material/Pagination'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { ButtonGroup } from '@/components/ButtonGroup'

type Props = {
  characters: Character[]
  pagination: ApiPatination
}

const Home: NextPage<Props> = ({
  characters,
  pagination: initialPaginationInfo,
}) => {
  const [name, setName] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState<
    Character[] | null
  >(null)
  const [paginationInfo, setPaginationInfo] = useState<ApiPatination | null>(
    null,
  )
  const [genderFilter, setGenderFilter] = useState<Character.Gender | null>(
    null,
  )
  const [statusFilter, setStatusFilter] = useState<Character.Status | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchCharactersUseCase = container.get<FetchCharactersUseCase>(
    Registry.FetchCharactersUseCase,
  )

  const handleChangePage = (_: unknown, page: number) => {
    setCurrentPage(page)
    fetchCharacters(page)
  }

  const handleClearFilters = async () => {
    setGenderFilter(null)
    setStatusFilter(null)
    setName('')
    setCurrentPage(1)
    setFilteredCharacters(null)
    setPaginationInfo(null)
  }

  const fetchCharacters = async (
    page?: number,
    filter?: {
      gender: Character.Gender | null
      status: Character.Status | null
    },
  ) => {
    const { characters, pagination } = await fetchCharactersUseCase.fetch({
      page,
      filter: {
        gender: filter?.gender ?? undefined,
        name,
        status: filter?.status ?? undefined,
      },
    })

    setFilteredCharacters(characters)
    setPaginationInfo(pagination)
  }

  const handleSearchByName = () => {
    fetchCharacters()
    setCurrentPage(1)
  }

  const handleSetGender = (gender: Character.Gender) => {
    const updatedValue = gender === genderFilter ? null : gender

    fetchCharacters(1, { gender: updatedValue, status: statusFilter })
    setGenderFilter(updatedValue)
    setCurrentPage(1)
  }

  const handleSetStatus = (status: Character.Status) => {
    const updatedValue = status === statusFilter ? null : status

    fetchCharacters(1, { status: updatedValue, gender: genderFilter })
    setStatusFilter(updatedValue)
    setCurrentPage(1)
  }

  const charactersToRender =
    filteredCharacters === null ? characters : filteredCharacters

  const paginationInfoToRender =
    paginationInfo === null ? initialPaginationInfo : paginationInfo

  const genders: Character.Gender[] = [
    'Female',
    'Genderless',
    'Male',
    'unknown',
  ]

  const statusList: Character.Status[] = ['Alive', 'Dead', 'unknown']

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <div className={styles.container}>
        <div className={styles['filters-container']}>
          <div className={styles.search}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Find a character..."
            />
            <Button variant="accent" onClick={handleSearchByName}>
              Search
            </Button>
          </div>
          <div>
            <span>Gender: </span>
            <ButtonGroup>
              {genders.map((gender) => (
                <Button
                  key={gender}
                  variant={genderFilter === gender ? 'accent' : 'standard'}
                  onClick={() => handleSetGender(gender)}
                >
                  {gender}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <span>Status: </span>
            <ButtonGroup>
              {statusList.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'accent' : 'standard'}
                  onClick={() => handleSetStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div className={styles['divider-sm']} />
          <div>
            <Button onClick={handleClearFilters}>Clear filters</Button>
          </div>
        </div>
        <div className={styles.divider} />
        <main>
          <div className={styles['characters-list']}>
            {charactersToRender.length > 0 ? (
              charactersToRender.map((item) => (
                <Card
                  key={item.id}
                  {...item}
                  redirectUrl={`/character/${item.id}`}
                />
              ))
            ) : (
              <p>We couldn{"'"}t find any character matching the filters</p>
            )}
          </div>
          <div className={styles['pagination-container']}>
            <Pagination
              count={paginationInfoToRender.pages}
              onChange={handleChangePage}
              variant="outlined"
              hideNextButton={paginationInfoToRender?.next === null}
              hidePrevButton={paginationInfoToRender?.prev === null}
              page={currentPage}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const useCase = container.get<FetchCharactersUseCase>(
    Registry.FetchCharactersUseCase,
  )

  const { characters, pagination } = await useCase.fetch()

  return {
    props: { characters, pagination },
  }
}

export default Home
