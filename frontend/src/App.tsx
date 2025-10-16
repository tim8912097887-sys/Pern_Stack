import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="products" element={<Products/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
