import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Profile from './components/Profile'
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import UpdateInfo from './components/UpdateInfo';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/dashboard" element={<Dashboard/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/resetpassword" element = {<ResetPassword/>}/>
        <Route path = "/updateinfo" element = {<UpdateInfo/>}/>
        
        <Route path = "/" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
