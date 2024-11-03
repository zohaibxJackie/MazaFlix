import Header from "./components/header"
import Main from "./components/Main"
import Random from "./components/Random"
import SearchPage from "./components/SearchPage"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/MazaFlix' element={<Main />} />
        <Route path='/Random' element={<Random />} />
        <Route path='/Search-For-Movies' element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App
