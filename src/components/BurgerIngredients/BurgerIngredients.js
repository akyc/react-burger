import React from "react";
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from "../IngredientsList/IngredientsList";

const BurgerIngredients = ({ ingredients, ingredientGroups }) => {
    const [current, setCurrent] = React.useState(ingredientGroups[0].name)

    return (
        <section style={{ width: "100%", maxWidth: 600 }}>
            <div style={{ width: "100%" }} className="">
                <p className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </p>
            </div>
            <div style={{ display: 'flex' }} className="pb-10">
                {ingredientGroups.map(({ name, title }, i) => {
                    return (
                        <Tab value={name} active={current === name} onClick={setCurrent} key={i}>
                            {title}
                        </Tab>
                    )
                })}
            </div>
            <div style={{ maxHeight: 912, overflowY: "auto" }}>
                {ingredientGroups.map(({ name, title }, i) => {
                    let actualIngredients = ingredients.filter(({ type }) => type === name)
                    return (
                        <IngredientsList ingredients={actualIngredients} groupTitle={title} key={i} />
                    )
                })}
            </div>
        </section>
    )
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    })).isRequired,
    ingredientGroups: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
    })).isRequired
};
export default BurgerIngredients