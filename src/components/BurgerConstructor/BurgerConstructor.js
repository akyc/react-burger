import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = ({ selectedIngredients }) => {
    return (
        <section style={{ width: "100%", maxWidth: 600 }} className='mt-25 pl-4'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="pb-3 pl-8">
                {selectedIngredients.slice(0, 1).map(({ _id, name, price, image }) => {
                    return (
                        <ConstructorElement
                            type={"top"}
                            isLocked={true}
                            text={name + ' (верх)'}
                            price={price}
                            thumbnail={image}
                            key={_id}
                        />
                    )
                })}
            </div>
            <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 440, overflowY: "auto" }}>
                {selectedIngredients.map(({ _id, name, price, image }) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: "0 8px" }} key={_id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={''}
                                isLocked={false}
                                text={name}
                                price={price}
                                thumbnail={image}
                            />
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='pt-3 pl-8'>
                {selectedIngredients.slice(0, 1).map(({ _id, name, price, image }) => {
                    return (
                        <ConstructorElement
                            type={"bottom"}
                            isLocked={true}
                            text={name + ' (низ)'}
                            price={price}
                            thumbnail={image}
                            key={_id}
                        />
                    )
                })}
            </div>
            <div className='mt-10 pr-4' style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', gap: '0 40px' }}>
                <div className='' style={{ display: 'flex' }}>
                    <p className="text text_type_digits-default pr-2">610</p> <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    })).isRequired
};

export default BurgerConstructor