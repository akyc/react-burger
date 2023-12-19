import React, {
    useEffect,
    useMemo,
    useRef
} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from '../IngredientsList/IngredientsList'
import styles from './BurgerIngredients.module.css'
import { useSelector, useDispatch } from "../../utils/constants"
import { useInView } from "react-intersection-observer"
import { selectTab } from "../../services/actions/tabs"
import { IIngredient } from "../../utils/types"

const BurgerIngredients = () => {
    const { ingredientsItems, ingredientGroups } = useSelector(store => store.ingredients)
    const current = useSelector(store => store.tabs.select)
    const dispatch = useDispatch()
    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    const setCurrent = (current:string) => {
        dispatch(selectTab(current))
    }

    const [bunsContainer, inViewBuns] = useInView({
        threshold: 0,
    });
    const [saucesContainer, inViewSauces] = useInView({
        threshold: 0,
    });
    const [mainsContainer, inViewMains] = useInView({
        threshold: 0,
    });

    const handleClick = (name:string) => {
        let target: React.RefObject<HTMLDivElement> | null = null
        switch (name) {
            case 'bun':
                target = bunsRef
                break
            case 'sauce':
                target  = saucesRef
                break
            case 'main':
                target = mainsRef
        }
        target?.current?.scrollIntoView({ behavior: 'smooth' })
        dispatch(selectTab(name))
    }

    useEffect(() => {
        if (inViewBuns) {
            setCurrent("bun");
        } else if (inViewSauces) {
            setCurrent("sauce");
        } else if (inViewMains) {
            setCurrent("main");
        }
    }, [inViewBuns, inViewSauces, inViewMains]);

    const buns = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item) => item.type === "bun"),
        [ingredientsItems]
    );

    const sauces = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item) => item.type === "sauce"),
        [ingredientsItems]
    );

    const mains = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item) => item.type === "main"),
        [ingredientsItems]
    );

    return (
        <section className={styles.ingredientsContainer}>
            <p className='text text_type_main-large pt-10 pb-5'>
                Соберите бургер
            </p>
            <div className={`${styles.tabsContainer} pb-10`}>
                {ingredientGroups.map(({ name, title }, i) => {
                    return (
                        <Tab value={name} active={current === name} onClick={() => handleClick(name)} key={i}>
                            {title}
                        </Tab>
                    )
                })}
            </div>
            <div className={styles.ingredientsListContainer}>
                <IngredientsList ingredients={buns} groupTitle={'Булки'} scrollRef={bunsRef} viewRef={bunsContainer}/>
                <IngredientsList ingredients={sauces} groupTitle={'Соусы'} scrollRef={saucesRef} viewRef={saucesContainer}/>
                <IngredientsList ingredients={mains} groupTitle={'Начинки'} scrollRef={mainsRef} viewRef={mainsContainer}/>
            </div>
        </section>
    )
}

export default BurgerIngredients
