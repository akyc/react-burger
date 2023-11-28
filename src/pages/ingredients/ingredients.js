import React, {
    useEffect
} from 'react'
import styles from './ingredients.module.css'
import {
    useParams
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";
import IngredientDetails
    from "../../components/IngredientDetails/IngredientDetails";

const getIngredientsItems = store => store.ingredients
const Ingredients = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    return (
        <div className={styles.main}>
            <IngredientDetails/>
        </div>
    )
};

export default Ingredients;
