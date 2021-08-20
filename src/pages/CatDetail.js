import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { catApiUrl, catHeaders } from '../utils/api'

const CatDetail = () => {
  const [storedSearchIdList, storeSearchIdList] = useLocalStorage('catImagesId', [])
  const [storedSearchCats, storeSearchCats] = useLocalStorage('catImages', [])
  const [cat, setCat] = useState({})
  const { catId } = useParams()
  const params = useMemo(
    () => ({
      q: `${catId}`,
    }),
    [catId]
  )
  const {
    data: cats,
    isLoading,
    hadError,
    error,
  } = useFetch(
    `${catApiUrl}/images/${catId}`,
    {},
    catHeaders,
    storedSearchCats,
    newData => {
      console.log(newData.length)
      storeSearchCats(storedSearchCats.concat(newData.length !== 0 ? newData : [{ id: catId, name: '' }]))
    },
    () => {
      const hasFetched = storedSearchIdList.includes(catId)
      if (!hasFetched) {
        storeSearchIdList(storedSearchIdList.concat(catId))
      }
      return !hasFetched
    }
  )
  useEffect(() => {
    setCat(
      cats.find(cat => {
        if (cat.id === catId) {
          console.log(cat.breeds[0].name)
          return cat
        }
      })
    )
  }, [cats])
  return (
    <div>
      <h1>CatDetail</h1>
      {!hadError ? (
        <>
          {isLoading && <div>로딩중</div>}
          {cat && (
            <>
              <img src={cat.url} />
              {cat.breeds &&
                cat.breeds.map(breed => (
                  <div key={`${breed.id}-${breed.name}`}>
                    <div>{breed.name}</div>
                    <div>{breed.description}</div>
                  </div>
                ))}
            </>
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
