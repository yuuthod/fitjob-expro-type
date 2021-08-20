import "./App.css";
import { Switch, Link, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Favarite from "./pages/Favarite";
import CatDetail from "./pages/CatDetail";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favarite">Favarite</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <div>
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
  );
}

export default App;

function UrlFallback() {
  return (
    <div>
      존재하지 않는 페이지 입니다.
      <Link to="/">홈페이지로 가기</Link>
    </div>
  );
}
