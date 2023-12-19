import React, { FC } from 'react';
import {
    useLocation,
    Link
} from 'react-router-dom';
import {
    getOrderDate,
    filterIngredients,
    calculatePrice
} from '../../utils/api';
import { TOrder } from '../../utils/types';
import { nanoid } from 'nanoid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css'
import {
    pageRoutes,
    useSelector
} from "../../utils/constants";

type TOrderCard = {
    element: TOrder
}

export const Order: FC<TOrderCard> = ({ element }) => {
    const location = useLocation();
    const { ingredientsItems: ingredients } = useSelector(state => state.ingredients);
    const filter = filterIngredients(element.ingredients, ingredients);
    return (<Link
        to={`${pageRoutes.feed}${element.number}`}
        state={{ background: location }}
        className={styles.link}
    >
        <li className={`${styles.card} ${styles.link}`}
        >

            <div className={styles.header}>
            <p className={`${styles.id} text text_type_digits-default`}>#{element.number}</p>
            <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
                {getOrderDate(element.createdAt)}
            </p>
            </div>
            <p className={`${styles.name} text text_type_main-medium`}>{element.name}</p>
            <div className={styles.ingredients}>
                <div className={styles.images}>
                    {filter.map((item, index) => {
                            let k = `${element.number}_${item._id}_${index}`
                            if (index < 5) {
                                return (
                                    <div key={k} style={{
                                            zIndex: 5 - index,
                                            transform: `translateX(${- index * 18}px)`
                                        }}>
                                        <img className={styles.image} src={item.image_mobile} alt={item.name}/>
                                    </div>
                                )
                            }
                                
                            if (index >= 5){
                                return (
                                    <div className={styles.box} key={k} style={{
                                            zIndex: 2,
                                            transform: `translateX(${- (index - 5) * 64}px)`,
                                        }}>
                                        <img className={styles.image} src={item.image_mobile} alt={item.name} />
                                    </div>
                                )
                            }
                        })}
                {filter.length > 5 ? <p className={`${styles.count} text text_type_digits-small`} style={{zIndex: filter.length -1}}>+{filter.length - 5}</p> : null}
                </div>
                <div className={styles.container}>
                    <p className={`${styles.price} text text_type_digits-default`}>
                        {calculatePrice(element.ingredients, ingredients)}
                    </p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>

        </li>
        </Link>
    )
}
