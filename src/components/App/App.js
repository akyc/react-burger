import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {getIngredients} from "../../services/actions/ingredients"
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal'
import styles from './App.module.css'


const App = () => {
  const dispatch = useDispatch()
  const {ingredientsRequest, ingredientsError, ingredientsRequestError} = useSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [])
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        {ingredientsRequest && 'Загрузка...'}
        {
          ingredientsError &&
          <Modal header='Ошибка'>
            <p className='text text_type_main-medium pt-20 pb-4'>Код ошибки: {ingredientsRequestError}</p>
            <p className='text text_type_main-default pt-20 pb-10'>Попробуйте перезагрузить страницу или вернуться позже</p>
          </Modal>
        }
        {
          !ingredientsRequest &&
          !ingredientsError&&
          <>
            <AppHeader />
            <main className={styles.main}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </main>
          </>
        }
      </div>
    </DndProvider>
  )
}

export default App
