import { useHistory } from 'react-router-dom'
import { useCallback, useContext } from 'react'

import LocalStorageContext from '../store/LocalStorageContext'

import FavariteButton from './FavariteButton'

const CatItem = ({
  item,
}) => {
  // 즐겨찾기 Context
  const context = useContext(LocalStorageContext)
  const {storedFavariteList, storeFavariteList} = context
  
  const history = useHistory()
  /**
   * cat 상세페이지 이동
   * @param {string} id
   */
   const handleClickMoveCatDetailPage = useCallback(id => {
    history.push(`/cat/${id}`)
  }, [])

  return (
    <li className="Cat">
      <FavariteButton id={item.id}/>
      <span>Name: {item.name}</span>
      <span>Origin: {item.origin}</span>
      <span>Description: {item.description}</span>
      <span>
        Wiki:{' '}
        <a href={item.wikipedia_url} target="_blank">
          {item.wikipedia_url}
        </a>
      </span>
      <div onClick={() => handleClickMoveCatDetailPage(item.image.id)}>
        <img className="Image" src={item.image ? item.image.url : null} />
      </div>
    </li>
  )
}

export default CatItem
