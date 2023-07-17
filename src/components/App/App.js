import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getIngredients} from "../../services/actions/ingredients";
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal'
import API from '../../utils/api'
import styles from './App.module.css'

const App = () => {
  const dispatch = useDispatch()
  const {ingredientsItems, ingredientsRequest, ingredientsFailed, ingredientsRequestError} = useSelector(store => store.ingredients)
  const ingredientGroups = [
    { name: 'bun', title: 'Булки' },
    { name: 'sauce', title: 'Соусы' },
    { name: 'main', title: 'Начинки' }
  ]

  useEffect(() => {
    dispatch(getIngredients())
  }, [])
  
  return (
    <div className='App'>
      {ingredientsRequest && 'Загрузка...'}
      {
        ingredientsFailed &&
        <Modal header='Ошибка'>
          <p className='text text_type_main-medium pt-20 pb-4'>Код ошибки: {ingredientsRequestError}</p>
          <p className='text text_type_main-default pt-20 pb-10'>Попробуйте перезагрузить страницу или вернуться позже</p>
        </Modal>
      }
      {
        !ingredientsRequest &&
        !ingredientsFailed &&
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredientsItems} ingredientGroups={ingredientGroups} />
            <BurgerConstructor selectedIngredients={ingredientsItems} />
          </main>
        </>
      }
    </div>
  )
}

export default App
