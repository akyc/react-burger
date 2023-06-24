import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import getData from '../../utils/data'
import styles from './App.module.css'

const App = () => {
  const ingredientGroups = [
    { name: 'bun', title: 'Булки' },
    { name: 'sauce', title: 'Соусы' },
    { name: 'main', title: 'Начинки' }
  ]
  const ingredients = getData()
  return (
    <div className='App'>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} ingredientGroups={ingredientGroups} />
        <BurgerConstructor selectedIngredients={ingredients} />
      </main>
    </div>
  )
}

export default App
