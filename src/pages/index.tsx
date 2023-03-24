import styles from '../styles/pages/home.module.css'
import { Card } from '@/components/Card'
import { ApiPatination, Character } from '@domain/entities'
import { FetchCharactersUseCase } from '@domain/usecases'
import { Registry, container } from '@infra/container-registry'

import Pagination from '@mui/material/Pagination'
import { GetStaticProps, NextPage } from 'next'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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

  const genderFilter = useRef<Character.Gender | null>(null)
  const statusFilter = useRef<Character.Status | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchCharactersUseCase = container.get<FetchCharactersUseCase>(
    Registry.FetchCharactersUseCase,
  )

  const handleChangePage = (_: unknown, page: number) => {
    setCurrentPage(page)
    fetchCharacters(page)
  }

  const handleClearFilters = async () => {
    genderFilter.current = null
    statusFilter.current = null
    setName('')
    setCurrentPage(1)
    setFilteredCharacters(null)
  }

  const fetchCharacters = async (page?: number) => {
    const { characters, pagination } = await fetchCharactersUseCase.fetch({
      page,
      filter: {
        gender: genderFilter.current ?? undefined,
        name,
        status: statusFilter.current ?? undefined,
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
    genderFilter.current = gender === genderFilter.current ? null : gender
    fetchCharacters()
    setCurrentPage(1)
  }

  const handleSetStatus = (status: Character.Status) => {
    statusFilter.current = status === statusFilter.current ? null : status
    fetchCharacters()
    setCurrentPage(1)
  }

  const charactersToRender =
    filteredCharacters === null ? characters : filteredCharacters

  const paginationInfoToRender =
    paginationInfo === null ? initialPaginationInfo : paginationInfo

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <main>
        <div className={styles['filters-container']}>
          <div>
            <button onClick={handleClearFilters}>Clear filters</button>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button onClick={handleSearchByName}>Search</button>
          </div>
          <div>
            <button onClick={() => handleSetGender('Male')}>Male</button>
            <button onClick={() => handleSetGender('Female')}>Female</button>
            <button onClick={() => handleSetGender('Genderless')}>
              Genderless
            </button>
            <button onClick={() => handleSetGender('unknown')}>unknown</button>
          </div>
          <div>
            <button onClick={() => handleSetStatus('Alive')}>Alive</button>
            <button onClick={() => handleSetStatus('Dead')}>Dead</button>
            <button onClick={() => handleSetStatus('unknown')}>unknown</button>
          </div>
        </div>

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
            <p>Character</p>
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
