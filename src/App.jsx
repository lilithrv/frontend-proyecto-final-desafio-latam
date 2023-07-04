import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}