import './App.css'
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailedGameCard from './components/Card/DetailedGameCard'
import { SearchResults } from './components/SearchResults/SearchResults';
import StatisticsPage from './components/StatisticsPage.jsx/StatisticsPage';
import Films from './components/Films/Films';

function App() {
  return (
    <>
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/card" element={<DetailedGameCard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
