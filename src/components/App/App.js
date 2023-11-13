import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getIngredients } from '../../services/actions/ingredients'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal'
import styles from './App.module.css'
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'
import Ingredients
    from "../../pages/ingredients/ingredients";
import Login
    from "../../pages/login/login";
import Register
    from "../../pages/register/register";
import ForgotPassword
    from "../../pages/forgot-password/forgot-password";
import ResetPassword
    from "../../pages/reset-password/reset-password";
import Profile
    from "../../pages/profile/profile";
import NotFound
    from "../../pages/not-found/not-found";
import {
    ProtectedRoute
} from "../ProtectedRoute/ProtectedRoute";

const getIngredientsItems = store => store.ingredients

const App = () => {
    const dispatch = useDispatch()
    const {ingredientsRequest, ingredientsError, ingredientsRequestError} = useSelector(getIngredientsItems)
    const location = useLocation()
    const background = location.state && location.state.background
    const { _id } = useSelector(state => state.ingredientDetails.ingredient)

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
              <Routes location={background || location}>
                  <Route path={`/ingredients/:${_id}`} element={<Ingredients />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route path='/profile' element={
                      <ProtectedRoute>
                          <Profile/>
                      </ProtectedRoute>
                  } />
                  <Route path='/' element={
                      <main className={styles.main}>
                          <BurgerIngredients/>
                          <BurgerConstructor/>
                      </main>
                  } />
                  <Route path='*' element={<NotFound />} />
              </Routes>
          </>
        }
      </div>
    </DndProvider>
  )
}

export default App
