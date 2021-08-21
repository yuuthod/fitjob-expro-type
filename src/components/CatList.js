import '../components/CatList.scss'

import { useMemo, useContext } from 'react'

import { catApiUrl, catHeaders } from '../utils/api'
import { useFetch } from '../hooks/useFetch'

import LocalStorageContext from '../store/LocalStorageContext'
import CatItem from '../components/CatItem'
import HeaderButtonGroup from './HeaderButtonGroup'

const CatList = () => {
  const context = useContext(LocalStorageContext)
  const { storedBreeds, storeBreeds, storedPages, storePages, currentPage, setCurrentPage } = context

  // api를 호출할 때의 params 값
  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 10,
    }),
    [currentPage]
  )
  // useFetch를 이용한 api 호출
  // stored에 있는 값을 사용하지 않을 때 PreviousPage 이벤트가 일어나면 어떻게 data를 컨트롤 할지
  const {
    data,
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
  return (
    <div className="Cats">
      <div>현재 페이지 : {currentPage}</div>
      <HeaderButtonGroup />
      <ul>
        {storedBreeds.map((breed, index) => (
          <CatItem key={`${breed.id}-${index}`} item={breed} />
        ))}
      </ul>
    </div>
  )
}

export default CatList
