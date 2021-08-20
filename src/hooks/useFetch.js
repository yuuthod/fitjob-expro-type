import { useState, useEffect } from 'react'
import { getQueryString } from '../utils/misc'

/**
 * api 호출 함수
 * @param {string} apiUrl api주고
 * @param {string} params 쿼리스트링
 * @param {map} headers api 호출 조건
 * @param {any} initialData
 * @param {func} storeStorage 데이터를 저장하는 함수
 * @param {func} getShouldFetch fetchData를 실행할 조건 함수
 * @returns {Object} 데이터, 로딩유무, 에러유무, 발생된 에러
 */
export function useFetch(apiUrl, params, headers, initialData, storeStorage, getShouldFetch) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${apiUrl}${getQueryString(params)}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'default',
          headers,
        })
        const data = await response.json()
        // 이전 데이터와 합해서 data에 저장
        setData( previousData => previousData.concat(data))
        // param에서 넘어온 localStorage에 저장하는 함수를 이용해 데이터 저장
        storeStorage(data)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    // fetchData를 실행 할 조건 함수
    // CatList에서는 현재 페이지가 페이지 리스트에 없다면 fetchData 실행
    if (getShouldFetch()) {
      fetchData()
    }
  }, [apiUrl, params, headers])

  return {
    data,
    isLoading,
    hasError: error !== null,
    error,
  }
}
