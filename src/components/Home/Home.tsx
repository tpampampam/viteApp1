import { useEffect } from "react";
import { filterByPrice, productsSelector } from "../../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";



const Home = () => {

    const {products, categories} = useAppSelector((state) => state)
    // const {list} = useAppSelector(productsSelector)
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(!products.list.length) return;

        dispatch(filterByPrice(100))
    },[dispatch, products.list.length])

    return(
        <>   
            <Poster/>
            <Products 
                products={products.list} 
                amount={5}
                title="Trending"
                styled={{d:'d'}}
            />
            <Categories 
                products={categories.list} 
                amount={5}
                title="Worth Seeing"
            />
            <Banner/>
            <Products 
                products={products.filtered} 
                amount={5}
                title="Less than 100$"
                styled={{d:'d'}}
            />
        </>
    )
}

export default Home;