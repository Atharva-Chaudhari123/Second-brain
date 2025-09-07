import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Auth/SingUp'
import SignIn from './components/Auth/SignIn'
import { UserContexProvider } from './context/UsersContext'


function App() {

  return (
    <UserContexProvider>
      <div>
        
      </div>


      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}> </Route>
      </Routes>

    </UserContexProvider>
  )
}

export default App
