import React from 'react'
import done from '../../images/done.png'
import { useSelector } from "../../utils/constants"

const OrderDetails = () => {
    const {orderId} = useSelector(store => store.orderDetails)
    return (
        <>
            {orderId ? (
                <>
                    <p className='text text_type_digits-large pb-8 text-center'>{orderId}</p>
                    <p className='text text_type_main-small pb-15'>идентификатор заказа</p>
                </>
            ) : (
                <p className='text text_type_main-small pb-15'>Получаю идентификатор заказа...</p>
            )}

            <img src={done} className='pb-15' alt='done' />
            <p className='text text_type_main-small pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive pb-10'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails
