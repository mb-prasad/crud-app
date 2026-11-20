import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink> |{' '}
        <NavLink to="/login">Login</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  )
}

export default App
