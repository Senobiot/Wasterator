import './App.css'
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameCard from './components/Card/GameCard'
import SearchResultsTable from './components/SearchResults/SearchResultsTable';
import StatisticsPage from './components/StatisticsPage.jsx/StatisticsPage';
import Films from './components/Films/Films';
import MovieCard from './components/Card/MovieCard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/results" element={<SearchResultsTable />} />
        <Route path="/game" element={<GameCard />} />
        <Route path="/movie" element={<MovieCard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
