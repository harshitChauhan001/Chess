import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'

function AllRoutes() {
  return (
      <div>
          <Routes>
              <Route path='/' element={<Home/> } />
              <Route path='/game/:key' element={ <Game/>} />
          </Routes>
    </div>
  )
}

export default AllRoutes