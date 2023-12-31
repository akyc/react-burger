import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getIngredients } from '../../services/actions/ingredients'
import { pageRoutes } from '../../utils/constants'
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

import {Location} from "react-router-dom";

// @ts-ignore
const getIngredientsItems = store => store.ingredients

const App: FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // @ts-ignore
    const {ingredientsRequest, ingredientsError, ingredientsRequestError} = useSelector(getIngredientsItems)

    const locationState = location.state as {background: Location}
    const background = locationState && locationState.background

    useEffect(() => {
        // @ts-ignore
        dispatch(getIngredients())
    }, [])

    const modalCloseHandler = () => {
        navigate(pageRoutes.main, { replace: true })
    }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        {ingredientsRequest && 'Загрузка...'}
        {
          ingredientsError &&
          <Modal header='Ошибка' onClose={modalCloseHandler}>
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
                  <Route index path={pageRoutes.main} element={
                      <main className={styles.main}>
                          <BurgerIngredients/>
                          <BurgerConstructor/>
                      </main>
                  }/>
                  <Route path={pageRoutes.ingredientsId} element={<IngredientDetails/>} />
                  <Route path={pageRoutes.login} element={
                      <ProtectedRoute onlyUnAuth>
                          <Login />
                      </ProtectedRoute>
                  } />
                  <Route path={pageRoutes.register} element={
                      <ProtectedRoute onlyUnAuth>
                        <Register />
                      </ProtectedRoute>
                  } />
                  <Route path={pageRoutes.forgotPassword} element={
                      <ProtectedRoute onlyUnAuth>
                          <ForgotPassword />
                      </ProtectedRoute>
                  } />
                  <Route path={pageRoutes.resetPassword} element={
                      <ProtectedRoute onlyUnAuth>
                      <ResetPassword />
                      </ProtectedRoute>
                  } />
                  <Route path={pageRoutes.profile} element={
                      <ProtectedRoute onlyUnAuth={false}>
                          <Profile/>
                      </ProtectedRoute>
                  } />
                  <Route path={pageRoutes.notFound} element={<NotFound />} />
                </Routes>
                {background && (
                  <Routes>
                      <Route path={pageRoutes.ingredientsId} element={
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
