import '../components/CatList.scss'

import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

import CatItem from '../components/CatItem'

const Favarite = () => {
  const [storedBreeds] = useLocalStorage('breeds', [])
  const [storedFavariteList, storeFavariteList] = useLocalStorage('favariteList', [])
  const [favariteList, setFavariteList] = useState([])
  const handleClickRemoveFavarite = useCallback(
    id => {
      const removedList = storedFavariteList.filter(itemId => itemId !== id)
      storeFavariteList(removedList)
    },
    [storedFavariteList]
  )
  useEffect(() => {
    setFavariteList(storedBreeds.filter(item => storedFavariteList.includes(item.id)))
  }, [storedFavariteList])
  return (
    <div className="Cats">
      <h1>Favarite</h1>
      <ul>
        {favariteList.map((item, index) => (
          <CatItem key={`${item.id}-${index}`} item={item} handleClickRemoveFavarite={handleClickRemoveFavarite} />
        ))}
      </ul>
    </div>
  )
}

export default Favarite
