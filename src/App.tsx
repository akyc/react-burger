import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import getData from './utils/data';

import appStyles from './App.module.css';

function App() {
  const ingredientGroups = [
        { name: "bun", title: "Булки" },
        { name: "sauce", title: "Соусы" },
        { name: "main", title: "Начинки" }
    ]
    const ingredients = getData()
  return (
    <div className="App">
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} ingredientGroups={ingredientGroups}/>
        <BurgerConstructor selectedIngredients={ingredients}/>
      </main>
      
    </div>
  );
}

export default App;
