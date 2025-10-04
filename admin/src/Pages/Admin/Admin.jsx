import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/sidebar'
import {Routes,Route} from 'react-router-dom'
import Addproduct from '../../components/Addproduct/Addproduct'
import Listproduct from '../../components/Listproduct/Listproduct.jsx'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/listproduct' element={<Listproduct/>}/>
        </Routes>
    </div>
  )
}

export default Admin