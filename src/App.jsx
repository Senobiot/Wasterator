import "./App.css";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameCard from "./components/Card/GameCard";
import SearchResultsTable from "./components/SearchResults/SearchResultsTable";
import StatisticsPage from "./components/StatisticsPage.jsx/StatisticsPage";
import Films from "./components/Films/Films";
import MovieCard from "./components/Card/MovieCard";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Auth/Dashboard";
import Registration from "./components/Auth/Registration";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkIsAuth } from "./reducers/authReducer";
import { ROUTES } from "./constants/constants";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path={ROUTES.PAGE.MY_GAMES} element={<Home />} />
          <Route path={ROUTES.PAGE.MY_FILMS} element={<Films />} />
          <Route path={ROUTES.PAGE.STATISTIC} element={<StatisticsPage />} />
          <Route path={ROUTES.PAGE.SEARCH_RESULTS} element={<SearchResultsTable />} />
          <Route path={ROUTES.CARDS.GAME} element={<GameCard />} />
          <Route path={ROUTES.CARDS.FILM} element={<MovieCard />} />
          <Route path={ROUTES.PAGE.LOGIN} element={<Login />} />
          <Route path={ROUTES.PAGE.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.PAGE.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
