import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
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
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth } from "./reducers/authReducer";
import { ROUTES } from "./constants/constants";
import { selectLoadingStatus } from "./selectors/selectors";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingStatus);

  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Menu />
        {isLoading && <Loader />}
        <Routes>
          <Route path={ROUTES.PAGE.HOME} element={<Home />} />
          <Route path={ROUTES.PAGE.MY_GAMES} element={<Games />} />
          <Route path={ROUTES.PAGE.MY_FILMS} element={<Films />} />
          <Route path={ROUTES.PAGE.STATISTIC} element={<StatisticsPage />} />
          <Route
            path={ROUTES.PAGE.SEARCH_RESULTS}
            element={<SearchResultsTable />}
          />
          <Route path={ROUTES.CARDS.gameDetails} element={<GameCard />} />
          <Route path={ROUTES.CARDS.movieDetails} element={<MovieCard />} />
          <Route path={ROUTES.PAGE.LOGIN} element={<Login />} />
          <Route path={ROUTES.PAGE.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.PAGE.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
