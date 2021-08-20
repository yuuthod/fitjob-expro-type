import '../components/CatList.scss'

import { useContext, useEffect, useState } from 'react'
import LocalStorageContext from '../store/LocalStorageContext'

import CatItem from '../components/CatItem'

const Favarite = () => {

  const context = useContext(LocalStorageContext)
  const {storedFavariteList, storeFavariteList, storedBreeds} = context

  const [favariteList, setFavariteList] = useState([])

  useEffect(() => {
    setFavariteList(storedBreeds.filter(item => storedFavariteList.includes(item.id)))
  }, [storedFavariteList])
  return (
    <div className="Cats">
      <h1>Favarite</h1>
      <ul>
        {favariteList.map((item, index) => (
          <CatItem key={`${item.id}-${index}`} item={item}/>
        ))}
      </ul>
    </div>
  )
}

export default Favarite
