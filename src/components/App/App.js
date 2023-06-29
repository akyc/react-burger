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
  })
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    API.getIngredients()
      .then(({ data }) => setState({ ...state, ingredients: data }))
      .catch((err) => setError(err.status))
      .finally(() => setLoading(false))
  }, [])

  const { ingredientGroups, ingredients } = state;
  return (
    <div className='App'>
      {isLoading && 'Загрузка...'}
      {
        error &&
        <Modal header='Ошибка'>
          <p className='text text_type_main-medium pt-20 pb-4'>Код ошибки: {error}</p>
          <p className='text text_type_main-default pt-20 pb-10'>Попробуйте перезагрузить страницу или вернуться позже</p>
        </Modal>
      }
      {
        !isLoading &&
        !error &&
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
