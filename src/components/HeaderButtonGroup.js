import { useContext, useCallback } from 'react'
import LocalStorageContext from '../store/LocalStorageContext'

const HeaderButtonGroup = () => {
  const context = useContext(LocalStorageContext)
  const { storedBreeds, storeBreeds, storedPages, storePages, currentPage, setCurrentPage } = context
  const handlePreviousPage = useCallback(() => {
    if (currentPage <= 1) {
      return
    }
    storePages(storedPages.slice(0, currentPage - 1))
    storeBreeds(storedBreeds.slice(0, (currentPage - 1) * 10))
    setCurrentPage(previousPage => previousPage - 1)
  }, [currentPage])
  const handleNextPage = useCallback(() => {
    setCurrentPage(previousPage => previousPage + 1)
  }, [])
  return (
    <>
      <button onClick={handlePreviousPage}>이전 페이지</button>
      <button onClick={handleNextPage}>다음 페이지</button>
    </>
  )
}

export default HeaderButtonGroup
