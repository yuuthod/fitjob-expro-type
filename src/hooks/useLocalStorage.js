import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      // localStorage에 현재 넘어온 키값이 null이 아니라면 item값을 JSON으로 파싱해서 return
      return item === null ? initialValue : JSON.parse(item)
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // localStorage에 저장하는 save 함수
  const save = (value) => {
    try {
      // value값을 JSON 문자열로 변환해 저장
      localStorage.setItem(key, JSON.stringify(value))
      // storedValue에도 값 저장
      setValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, save]
}
