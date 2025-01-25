import './App.css'
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailedGameCard from './components/Card/DetailedGameCard'
import { SearchResults } from './components/SearchResults/SearchResults';
import StatisticPage from './components/StatsPages.jsx/StatisticPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<StatisticPage />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/card" element={<DetailedGameCard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
