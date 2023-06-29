import React, { useEffect, useState } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal'
import API from '../../utils/api'
import styles from './App.module.css'

const App = () => {
  const [state, setState] = useState({
    ingredientGroups: [
      { name: 'bun', title: 'Булки' },
      { name: 'sauce', title: 'Соусы' },
      { name: 'main', title: 'Начинки' }],
    ingredients: [],
    isLoading: false,
    hasError: false,
    error: null
  })
  const { ingredientGroups, ingredients, isLoading, hasError, error } = state;

  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true })
    API.getIngredients(state, setState)
  }, [])

  return (
    <div className='App'>
      {isLoading && 'Загрузка...'}
      {hasError &&
        <Modal header='Ошибка'>
          {error && <p className='text text_type_main-medium pt-20 pb-4'>Код ошибки: {error}</p>}
          <p className='text text_type_main-default pt-20 pb-10'>Попробуйте перезагрузить страницу или вернуться позже</p>
        </Modal>
      }
      {!isLoading &&
        !hasError &&
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} ingredientGroups={ingredientGroups} />
            <BurgerConstructor selectedIngredients={ingredients} />
          </main>
        </>
      }
    </div>
  )
}

export default App
