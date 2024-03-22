import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/apiSlice";

import style from '../../styles/Category.module.css'
import Products from "../Products/Products";
import { useAppSelector } from "../../redux/store";
import { categoriesSelector } from "../../redux/categoriesSlice";

type Values = {
    title: string
    price_min: number
    price_max: number
}

export type Params = {
    categoryId: string | undefined
    limit: number
    offset: number
} & Values

const Category = () => {
    const { id }= useParams()
    const { list } = useAppSelector(categoriesSelector)

    const defaultValues: Values = {
        title: '',
        price_min: 0,
        price_max: 0,
    }

    const defaultParams: Params = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues
    }
    const [isEnd, setEnd] = useState<boolean>(false)
    const [cat, setCat] = useState(null)
    const [items, setItems] = useState([])
    const [values, setValues] = useState<Values>(defaultValues);
    const [params, setParams] = useState<Params>(defaultParams)

    const {data = [], isLoading, isSuccess} = useGetProductsQuery(params)
    
    useEffect(() => {
        if(!id) return;

        setValues(defaultValues)
        setItems([]);
        setEnd(false);
        setParams({ ...defaultParams, categoryId: id })
    },[id])

    useEffect(() => {
        if(!id || !list.length) return;

        const category = list.find((item: any) => item.id === Number(id))
        
        setCat(category)
    },[list, id])

    useEffect(() => {
        if(isLoading) return

        if (!data.length) return setEnd(true);

        setItems((_items) => [..._items, ...data]) 
    },[data, isLoading])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values, 
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setItems([]);
        setEnd(false);
        setParams({...defaultParams, ...values});
    }
    const handleReset = () => {
        setValues(defaultValues);
        setParams(defaultParams);
        setEnd(false);
    }

    return(
        <section className={style.wrapper}>
            <h2 className={style.title}>{cat?.name}</h2>
            <form  className={style.filters} onSubmit={handleSubmit}>
                <div className={style.filter}>
                    <input 
                        type="text" 
                        name='title' 
                        placeholder="Product name"
                        onChange={handleChange}
                        value={values.title}
                    />
                </div>
                <div className={style.filter}>
                    <input 
                        type="number" 
                        name='price_min' 
                        placeholder="0"
                        onChange={handleChange}
                        value={values.price_min}
                    />
                    <span>Price from</span>
                </div>
                <div className={style.filter}>
                    <input 
                        type="number" 
                        name='price_max' 
                        placeholder="0"
                        onChange={handleChange}
                        value={values.price_max}
                    />
                    <span>Price to</span>
                </div>
                <button type="submit" hidden />
            </form>
            {isLoading ? (
                <div className='preloader'>Loading...</div>
            ): !isSuccess || !items.length ? (
                <div className={style.back}>
                    <span>No results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products 
                    title='' 
                    products={items} 
                    styled={{padding: 0}} 
                    amount={items.length}
                />
            )}

            {!isEnd && (
                <div className={style.more}>
                    <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>
                        See more
                    </button>
                </div>
            )}
        </section>
    )
}

export default Category;