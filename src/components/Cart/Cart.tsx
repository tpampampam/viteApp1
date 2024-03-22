import { ProductsList } from "../../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addItemToCart, removeItemFromCart, userSelector } from "../../redux/userSlice";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import style from '../../styles/Cart.module.css';
import { sumBy } from "../../utils";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(userSelector)

    const changeQuantity = (item: any, quantity: number) => {
        dispatch(addItemToCart({...item, quantity}))
    }

    const removeItem = (id: number) => {
        dispatch(removeItemFromCart(id))
    }

    return(
        <section className={style.cart}>
            <h2 className={style.title}>Your cart</h2>

            {!cart.length ? (
                <div className={style.empty}>Here is empty</div>
            ): (
                <>
                    <div className={style.list}>
                        {cart.map((item: ProductsList &{ quantity?: number}) => {
                            const {title, category, images, price, id, quantity} = item;
                            return (
                                <div className={style.item} key={id}>
                                    <div 
                                        className={style.image} 
                                        style={{backgroundImage: `url(${images[0]})`}}
                                    />
                                    <div className={style.info}>
                                        <h3 className={style.name}>{title}</h3>
                                        <div className={style.category}>{category.name}</div>
                                    </div>

                                    <div className={style.price}>{price}$</div>

                                    <div className={style.quantity}>
                                        <div className={style.minus} onClick={() =>changeQuantity(item, Math.max(1, quantity! - 1))}>
                                            <FaMinus />
                                        </div>&nbsp;&nbsp;
                                        <div>{quantity}</div>&nbsp;&nbsp;
                                        <div className={style.plus} onClick={() =>changeQuantity(item, quantity! + 1)}>
                                            <FaPlus />
                                        </div>
                                    </div>

                                    <div className={style.total}>{price * quantity!}$</div>
                                    <div className={style.close} onClick={() => removeItem(item.id)}>
                                        <IoClose/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.action}>
                        <div className={style.total}>
                            TOTAL PRICE: {" "}
                            <span>
                                {sumBy(cart.map(({quantity, price}: {quantity: number, price: number}) => quantity * price))}$
                            </span>
                        </div>
                        <button className={style.proceed}>Proceed to checkout</button>
                    </div>
                </>
            )}
        </section>
    )
}

export default Cart;