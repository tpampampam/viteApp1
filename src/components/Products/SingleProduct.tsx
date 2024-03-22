import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/apiSlice";
import { useEffect } from "react";
import { ROUTES } from "../../utils";
import Product from "./Product";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getRelatedProducts, productsSelector } from "../../redux/productsSlice";
import Products from "./Products";


const SingleProduct = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {data, isLoading, isSuccess, isFetching} = useGetProductQuery(id!)

    const { list, related } = useAppSelector(productsSelector)

    const navigate = useNavigate()
    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    },[ isLoading, isSuccess, isFetching])

    useEffect(() => {
        if(!data || !list.length) return

        dispatch(getRelatedProducts(data.category.id))

    }, [data, list.length])

    return(

        !data ? (
            <div>Loading</div>
        ) : (
            <>
                <Product {...data}/>
                <Products products={related} amount={5} title="Related products" styled={{d:'d'}}/>
            </>
        )
    )
}

export default SingleProduct;