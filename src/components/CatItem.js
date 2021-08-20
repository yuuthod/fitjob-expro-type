import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

const CatItem = ({
  item,
  // 즐겨찾기에 추가된 항목인지 알려주는 값
  isFavariteItem,
  // 즐겨찾기 추가 함수
  handleClickAddFavarite,
  // 즐겨찾기 삭제 함수
  handleClickRemoveFavarite,
}) => {
  // 즐겨찾기 리스트
  const [storedFavariteList] = useLocalStorage('favariteList', [])
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
      <div>{isFavariteItem && <span>추가된 항목</span>}</div>
      {handleClickAddFavarite && <button onClick={() => handleClickAddFavarite(item.id)}>추가</button>}
      {handleClickRemoveFavarite && <button onClick={() => handleClickRemoveFavarite(item.id)}>삭제</button>}
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
