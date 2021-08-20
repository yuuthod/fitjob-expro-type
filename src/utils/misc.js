/**
 * key value 형태로 들어온 값을 url 뒤에 붙을 쿼리 스트링으로 변환
 * @param { key : value } params 
 * @returns { string } ?key=value&key=value...
 */
export function getQueryString(params) {
  return `?${Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&")}`;
}
