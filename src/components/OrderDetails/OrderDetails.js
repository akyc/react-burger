import React from 'react'
import PropTypes from 'prop-types'
import done from '../../images/done.png'

const OrderDetails = ({ id }) => {
    return (
        <>
            <p className='text text_type_digits-large pb-8 text-center'>{id}</p>
            <p className='text text_type_main-small pb-15'>идентификатор заказа</p>
            <img src={done} className='pb-15' alt='done' />
            <p className='text text_type_main-small pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive pb-10'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

OrderDetails.propTypes = {
    id: PropTypes.string.isRequired
}

export default OrderDetails