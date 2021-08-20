import '../components/CatList.scss'

import { useState, useMemo, useCallback } from 'react'

import { catApiUrl, catHeaders } from '../utils/api'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFetch } from '../hooks/useFetch'

import CatItem from '../components/CatItem'

const CatList = () => {
  // localStorage에 저장된 cats data list
  const [storedBreeds, storeBreeds] = useLocalStorage('breeds', [])
  // locaStorage에 저장된(호출된) 페이지 리스트
  const [storedPages, storePages] = useLocalStorage('fetchedPages', [])
  // 현재 페이지, storePages의 맨 마지막 값
  const [currentPage, setCurrentPage] = useState(storedPages.length !== 0 ? storedPages[storedPages.length - 1] : 1)
  // 즐겨찾기 리스트
  const [storedFavariteList, storeFavariteList] = useLocalStorage('favariteList', [])

  // api를 호출할 때의 params 값
  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 10,
    }),
    [currentPage]
  )

  // useFetch를 이용한 api 호출
  const {
    data: breeds,
    isLoading,
    hasError,
    error,
  } = useFetch(
    `${catApiUrl}/breeds`,
    params,
    catHeaders,
    storedBreeds,
    newData => {
      // api에서 호출된 데이터를 localStorage에 저장
      storeBreeds(storedBreeds.concat(newData))
    },
    () => {
      // 페이지 리스트에 현재 페이지 값이 존재하는지 체크
      const hasFetched = storedPages.includes(currentPage)
      // 존재하지 않는다면 현재페이지를 페이지 리스트에 저장
      if (!hasFetched) {
        storePages(storedPages.concat(currentPage))
      }
      // 존재하지 않는다면 api 재호출
      return !hasFetched
    }
  )
  const handleNextPage = useCallback(() => {
    setCurrentPage(previousPage => previousPage + 1)
  }, [])

  const handleClickAddFavarite = useCallback((id) => {
    if (!storedFavariteList.includes(id)) {
      storeFavariteList(storedFavariteList.concat(id))
    }
  }, [storedFavariteList])

  return (
    <div className="Cats">
      <button onClick={handleNextPage}>다음페이지</button>
      <ul>
        {breeds.map((breed, index) => (
          <CatItem key={`${breed.id}-${index}`} item={breed} isFavariteItem={storedFavariteList.includes(breed.id)} handleClickAddFavarite={handleClickAddFavarite} />
        ))}
      </ul>
    </div>
  )
}

export default CatList
