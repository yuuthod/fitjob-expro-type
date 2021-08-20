
# 요구사항

## thecatapi를 사용해서 웹 애플리케이션 만들기

- [x] 어떤 페이지에서도 다른 페이지로 이동할 수 있도록 네비게이션 만들기
-  페이지 만들기
    - [x] / -> Home(Cat List)
      - [ ] favorite 버튼 만들기 -> 로컬 스토리지에 고양이 저장
    - [ ] Favorite Cats(Cat List)
    - [x] /cat/:catId -> Cat Detail
      - [x] catId를 이용해서 고양이 상세 api 호출
      - [ ] favorite 버튼 만들기 -> 로컬 스토리지에 고양이 저장
      - [ ] 추가/삭제하는 기능
- [x] 커스텀 훅 만들어서 사용하기
  - API 호출을 위한 Hook
  - 로컬스토리지 혹은 세션스토리지를 사용하는 Hook
- [ ] 페이지를 유의미한 컴포넌트 단위로 분리하기
- [ ] Error가 생길 수 있는 컴포넌트를 ErrorBoundary로 감싸기
  - ErrorBoundary에 Sentry 적용하기
  - Error UI(error fallback component) 만들기
- [ ] Context API를 사용해 필요한 데이터를 전역적으로 다루기
  - 최소한 데이터 종류 1개를 다루기
    - ex) favorite cats를 로컬스토리지 대신에 Context API로 다루기
- [ ] Sass를 이용해 약간의 디자인 입히기