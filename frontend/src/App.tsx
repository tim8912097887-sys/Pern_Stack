import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { lazy, Suspense } from "react"

const Create = lazy(() => (import ("./pages/Create")));
const Update = lazy(() => import ("./pages/Update"));

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="update/:id" element={
            <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
              <Update/>
            </Suspense>
          } />
          <Route path="create" element={
            <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
              <Create/>
            </Suspense>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
