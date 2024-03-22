import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils";
import style from '../../styles/Header.module.css'

import LOGO from '../../images/logo.svg'
import AVATAR from '../../images/avatar.jpg'
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleForm, userSelector } from "../../redux/userSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/apiSlice";
import { ProductsList } from "../../redux/productsSlice";



const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentUser, cart } = useAppSelector(userSelector);

    const [values, setValues] = useState<{name: string, avatar: string}>({name: 'Guest', avatar: AVATAR})
    const [searchValue, setSearchValue] = useState('')

    const {data, isLoading} = useGetProductsQuery({title: searchValue})

    useEffect(() => {
        if(!currentUser) return;
        
        setValues(currentUser)
    },[currentUser])

    const handleClick = () => {
        if(!currentUser) {
            dispatch(toggleForm(true))
        } else navigate(ROUTES.PROFILE)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return(
        <div className={style.header}>
           <div className={style.logo}>
            <Link to={ROUTES.HOME}>
                <img src={LOGO} alt="Stuff" />
            </Link>
           </div>

            <div className={style.info}>
                <div className={style.user} onClick={handleClick}>
                    <div className={style.avatar}
                         style={{backgroundImage: `url(${values.avatar})`}}
                    />
                    <div className={style.username}>{values.name}</div>
                </div>

                <form className={style.form}>
                    <div className={style.icon}>
                        <IoSearch/>
                    </div>
                    <div className={style.input}>
                        <input 
                            type="search" 
                            name="search"
                            placeholder="Search for anything..."
                            autoComplete="off"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                    {searchValue && <div className={style.box}>
                        {isLoading ? 'Loading' : !data.length ? 'No results' : (
                            data.map(({id, title, images}: ProductsList) => {
                                return (
                                    <Link 
                                        key={id}
                                        onClick={() => setSearchValue('')} 
                                        className={style.item} 
                                        to={`products/${id}`}
                                    >
                                        <div 
                                            className={style.image}
                                            style={{ backgroundImage: `url(${images[0]})`}}
                                        />
                                        <div className={style.title}>
                                            {title}
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>}
                </form>
                <div className={style.account} >
                    <Link to={ROUTES.HOME} className={style.favourites}>
                        <FaRegHeart/>
                    </Link>

                    <Link to={ROUTES.CART} className={style.cart}>
                        <BsCart2/>
                        {cart.length && (
                            <span className={style.count}>{cart.length}</span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;