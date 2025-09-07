import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Auth/SingUp'
import SignIn from './components/Auth/SignIn'



function App() {

  return (
    <div>
      <div>

      </div>


      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}> </Route>
      </Routes>

    </div>
  )
}

export default App
