import '../components/CatDetail.scss'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { catApiUrl, catHeaders } from '../utils/api'

import FavariteButton from '../components/FavariteButton'

const CatDetail = () => {
  const [storedCatImagesId, storeCatImagesId] = useLocalStorage('catImagesId', [])
  const [storedCarImages, storeCatImages] = useLocalStorage('catImages', [])
  const [cat, setCat] = useState({})
  const { catId } = useParams()
  const {
    data: cats,
    isLoading,
    hadError,
    error,
  } = useFetch(
    `${catApiUrl}/images/${catId}`,
    {},
    catHeaders,
    storedCarImages,
    newData => {
      console.log(newData.length)
      storeCatImages(storedCarImages.concat(newData.length !== 0 ? newData : [{ id: catId, name: '' }]))
    },
    () => {
      const hasFetched = storedCatImagesId.includes(catId)
      if (!hasFetched) {
        storeCatImagesId(storedCatImagesId.concat(catId))
      }
      return !hasFetched
    }
  )
  useEffect(() => {
    setCat(
      cats.find(cat => cat.id === catId)
    )
  }, [cats])
  return (
    <div>
      <h1>CatDetail</h1>
      {!hadError ? (
        <>
          {isLoading && <div>로딩중</div>}
          {cat && (
            <div className="CatDetail">
              <img src={cat.url} />
              {cat.breeds &&
                cat.breeds.map(breed => (
                  <div key={`${breed.id}-${breed.name}`}>
                    <FavariteButton id={breed.id}/>
                    <p className="CatName">{breed.name}</p>
                    <div>{breed.description}</div>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <p>
          데이터를 불러오는 도중 에러가 발생했습니다.
          <br />
          {JSON.stringify(error, null, 2)}
        </p>
      )}
    </div>
  )
}

export default CatDetail
