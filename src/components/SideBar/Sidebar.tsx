

import { NavLink } from 'react-router-dom';
import style from '../../styles/Sidebar.module.css';
import { useAppSelector } from '../../redux/store';
import { CategoriesList, categoriesSelector } from '../../redux/categoriesSlice';



const SideBar = () => {

    const {list, loading} = useAppSelector(categoriesSelector)
    
    if(loading) return <div>Loading...</div>

    return(
        <section className={style.sidebar}>
            <div className={style.title}>CATEGORIES</div>
            <nav>
                <ul className={style.menu}>
                    {list.length > 0 && list.map(({id, name}: Pick<CategoriesList, 'id' | 'name'>) => (
                        <li key={id}>
                            <NavLink 
                                end
                                className={({ isActive }) => `${style.link} ${isActive ? style.active : ''}`}
                                to={`/categories/${id}`}
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={style.footer}>
                <a href='/help' className={style.link} target='_blank'>
                    HELP
                </a>
                <a href='/terms' className={style.link} target='_blank' style={{textDecoration: 'underline'}}>
                    Terms and Contitions
                </a>
            </div>
        </section>
    )
}

export default SideBar;