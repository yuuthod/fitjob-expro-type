import '../components/FavariteButton.scss'

import { useCallback, useContext, useEffect, useState } from 'react'
import LocalStorageContext from '../store/LocalStorageContext'

const FavariteButton = ({ id }) => {
  const context = useContext(LocalStorageContext)
  const { storedFavariteList, storeFavariteList } = context

  /** 즐겨찾기 추가 */
  const handleClickAddFavarite = useCallback(() => {
    if (!storedFavariteList.includes(id)) {
      storeFavariteList(storedFavariteList.concat(id))
    }
  }, [storedFavariteList])

  /** 즐겨찾기 삭제 */
  const handleClickRemoveFavarite = useCallback(() => {
    const removedList = storedFavariteList.filter(itemId => itemId !== id)
    storeFavariteList(removedList)
  }, [storedFavariteList])

  return (
    <>
      {storedFavariteList.includes(id) ? (
        <button onClick={handleClickRemoveFavarite} className="RemoveBtn">
          삭제
        </button>
      ) : (
        <button onClick={handleClickAddFavarite} className="AddBtn">
          즐겨찾기 추가
        </button>
      )}
    </>
  )
}

export default FavariteButton
