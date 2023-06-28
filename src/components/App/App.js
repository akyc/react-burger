import React, { useEffect, useState } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal'
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
    error: null,
    apiUrl: 'https://norma.nomoreparties.space/api/ingredients'
  })
  const { ingredientGroups, ingredients, isLoading, hasError, error, apiUrl } = state;

  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true })
    fetch(apiUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(({ data }) => setState({ ...state, ingredients: data, isLoading: false }))
      .catch(err => setState({ ...state, hasError: true, isLoading: false, error: err.status }))
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
        ingredients.length &&
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
