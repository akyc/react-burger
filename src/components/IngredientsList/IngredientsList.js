import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsList = ({ ingredients, groupTitle }) => {
    return (
        <div>
            <p className="text text_type_main-default">{groupTitle}</p>
            <div className="pt-6 pb-10 pl-4" style={{ display: "flex", gap: '32px 24px', flexWrap: 'wrap', flexDirection: 'row', }}>
                {ingredients.map(({ name, price, image_mobile, image_large, image }, i) => {
                    return (
                        <div key={i} style={{ position: 'relative', width: 272, flex: "0 0 auto" }} className="">
                            <picture className="pl-4 pr-4 pb-4">
                                <source media="(min-width: 1024px)" src={image_large} />
                                <source media="(max-width: 768px)" src={image_mobile} />
                                <img src={image} alt={name} />
                            </picture>
                            <div className="text text_type_digits-default pt-1 pb-1" style={{ display: "flex", gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                                {price} <CurrencyIcon type="primary" />
                            </div>
                            <p className="text text_type_main-default" style={{ textAlign: 'center' }}>
                                {name}
                            </p>
                            {i === 0 && <Counter count={1} size="default" extraClass="m-1" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default IngredientsList