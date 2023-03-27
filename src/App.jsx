import AppContextProvider from "../context/AppContext"
import { Outlet } from "react-router-dom"
import ShowContextProvider from "../context/ShowContext"
import Header from "./components/Header"

function App() {

  return (
    <ShowContextProvider>
      <AppContextProvider>
        <Header />
        <Outlet />
      </AppContextProvider>
    </ShowContextProvider>
  )
}

export default App
