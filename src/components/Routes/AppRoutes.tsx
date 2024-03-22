import { Route, Routes } from "react-router-dom"
import Home from "../Home/Home"
import SingleProduct from "../Products/SingleProduct"
import { ROUTES } from "../../utils"
import Profile from "../Profile/Profile"
import SinglCategory from "../Categories/SingleCategory"
import Cart from "../Cart/Cart"




export const AppRoutes = () => (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
        <Route path={ROUTES.PROFILE} element={<Profile/>}/>
        <Route path={ROUTES.CATEGORY} element={<SinglCategory/>}/>
        <Route path={ROUTES.CART} element={<Cart/>}/>
    </Routes>
)
