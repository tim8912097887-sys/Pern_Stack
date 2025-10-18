import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"
import Create from "./pages/Create"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="product/:id" element={<Product/>} />
          <Route path="create" element={<Create/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
