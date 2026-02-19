import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import UserList from "./pages/UserList"
import RegisterUser from "./pages/RegisterUser"
import ViewUser from "./pages/ViewUser"
import EditUser from "./pages/EditUser"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<RegisterUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
