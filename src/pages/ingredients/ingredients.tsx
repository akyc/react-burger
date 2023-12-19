import React, { FC, useEffect } from 'react'
import styles from './ingredients.module.css'
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
const Ingredients: FC = () => {
    return (
        <div className={styles.main}>
            <IngredientDetails/>
        </div>
    )
};

export default Ingredients;
