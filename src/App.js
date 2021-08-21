import './App.css'
import { Switch, Link, Route, BrowserRouter } from 'react-router-dom'

import { useLocalStorage } from './hooks/useLocalStorage'
import Home from './pages/Home'
import Favarite from './pages/Favarite'
import CatDetail from './pages/CatDetail'
import LocalStorageContext from './store/LocalStorageContext'
import { useContext, useEffect, useState } from 'react'

const Navigation = () => {
  return (
    <nav>
      <ul className="Nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favarite">Favarite</Link>
        </li>
      </ul>
    </nav>
  )
}

function App() {
  // 즐겨찾기 리스트
  const [storedFavariteList, storeFavariteList] = useLocalStorage('favariteList', [])
  // Cat List
  const [storedBreeds, storeBreeds] = useLocalStorage('breeds', [])
  // locaStorage에 저장된(호출된) 페이지 리스트
  const [storedPages, storePages] = useLocalStorage('fetchedPages', [])
  // 현재 페이지, storePages의 맨 마지막 값
  const [currentPage, setCurrentPage] = useState(storedPages.length !== 0 ? storedPages[storedPages.length - 1] : 1)
  return (
    <LocalStorageContext.Provider
      value={{
        storedFavariteList,
        storeFavariteList,
        storedBreeds,
        storeBreeds,
        storedPages,
        storePages,
        currentPage,
        setCurrentPage,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/favarite" component={Favarite} />
              <Route path="/cat/:catId" component={CatDetail} />
              <Route component={UrlFallback} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </LocalStorageContext.Provider>
  )
}

export default App

function UrlFallback() {
  return (
    <div>
      존재하지 않는 페이지 입니다.
      <Link to="/">홈페이지로 가기</Link>
    </div>
  )
}
