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
    useLocation,
    useNavigate
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
import IngredientDetails
    from "../IngredientDetails/IngredientDetails";

const getIngredientsItems = store => store.ingredients

const App = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {ingredientsRequest, ingredientsError, ingredientsRequestError} = useSelector(getIngredientsItems)
    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    const modalCloseHandler = (e) => {
        //dispatch(getIngredientsDetails({}))
        navigate('/', { replace: true })
    }

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
                  <Route index path='/' element={
                      <main className={styles.main}>
                          <BurgerIngredients/>
                          <BurgerConstructor/>
                      </main>
                  }/>
                  <Route path='/ingredients/:id' element={<IngredientDetails/>} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route path='/profile' element={
                      <ProtectedRoute>
                          <Profile/>
                      </ProtectedRoute>
                  } />
                  <Route path='*' element={<NotFound />} />
                </Routes>
                {background && (
                  <Routes>
                      <Route path='/ingredients/:id' element={
                          <Modal header='Детали ингредиента' onClose={modalCloseHandler}>
                              <IngredientDetails />
                          </Modal>
                      } />
                  </Routes>
                )}
          </>
        }
      </div>
    </DndProvider>
  )
}

export default App
