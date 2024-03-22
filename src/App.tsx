import { useEffect, useState } from 'react'
import './App.css'
import { AppRoutes } from './components/Routes/AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SideBar from './components/SideBar/Sidebar'
import { useAppDispatch} from './redux/store'
import {  getCategories } from './redux/categoriesSlice'
import { getProducts } from './redux/productsSlice'
import UserForm from './components/User/UserForm'

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  },[dispatch])

  return (
    <div className='app'>
      <Header/>
      <UserForm/>
      <div className='container'>
        <SideBar/>
        <AppRoutes/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
