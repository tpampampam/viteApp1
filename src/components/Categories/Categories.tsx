import { FC } from "react"

import style from '../../styles/Categories.module.css'
import { Link } from "react-router-dom"
import { CategoriesList } from "../../redux/categoriesSlice"

type CategoriesProps = {
    title: string
    products: CategoriesList[]
    amount: number
}


const Categories: FC<CategoriesProps> = ({title, products = [], amount}) => {
    const list = products.filter((_,i) => i < amount)

    return(
        <section className={style.section}>
            <h2>{title}</h2>
            <div className={style.list}>
                {list.map(({id, name, image}: any) => (
                    <Link to={`/categories/${id}`} key={id} className={style.item}>
                        <div 
                            className={style.image} 
                            style={{backgroundImage: `url(${image})`}}
                        />
                        <h3 className={style.title}>{name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    )
}
export default Categories;