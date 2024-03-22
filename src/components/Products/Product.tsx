
import { FC, useEffect, useState } from 'react';
import { ProductsList } from '../../redux/productsSlice';
import { useAppDispatch } from '../../redux/store';
import style from '../../styles/Product.module.css'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils';
import { addItemToCart } from '../../redux/userSlice';

const SIZES = [4, 4.5, 5]

// type ProductProps = Pick<ProductsList,'price' | 'images' | 'title' |'description'>

const Product:FC<ProductsList> = (item) => {
    const {images, title, price, description} = item;
    const dispatch = useAppDispatch();
    
    const [currentImage, setCurrentImage] = useState<string>('')
    const [currentSize, setCurrentSize] = useState<number>()

    useEffect(() => {
        if(!images.length) return;

        setCurrentImage(images[0])
    },[images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
    }

    return (
        <section className={style.product}>
            <div className={style.images}>
                <div 
                    className={style.current} 
                    style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={style['images-list']}>
                    {images.map((image, i) => (
                        <div
                            key={i} 
                            className={style.image} 
                            style={{backgroundImage: `url(${image})`}}
                            onClick={() => setCurrentImage(image)}
                        />
                    ))}
                </div>
            </div>
            <div className={style.info}>
                <h1 className={style.title}>{title}</h1>
                <div className={style.price}>
                    {price}$
                </div>
                <div className={style.color}>
                    <span>Color:</span>Green
                </div>
                <div className={style.sizes}>
                    <span>Sizes:</span>
                    <div className={style.list}>
                        {SIZES.map(size => (
                            <div 
                                key={size}
                                className={`${style.size} ${currentSize === size ? style.active : ''}` }
                                onClick={() => setCurrentSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={style.description}>{description}</p>
                <div className={style.actions}>
                    <button onClick={addToCart} className={style.add} disabled={!currentSize}>Add to Cart</button>
                    <button className={style.favourite}>Add to favourites</button>
                </div>
                <div className={style.bottom}>
                    <div className={style.purchased}>19 people purchased </div>
                    <Link to={ROUTES.HOME}> Return to store</Link>
                </div>
            </div>
        </section>
    )
}
export default Product;