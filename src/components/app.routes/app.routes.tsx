import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { DetailsPage } from '../../pages/details.page';

const MainPage = lazy(() => import('../../pages/main.page'));
const LoginPage = lazy(() => import('../../pages/login.page'));
const RegisterPage = lazy(() => import('../../pages/register.page'));
const CreateRecipePage = lazy(() => import('../../pages/create.recipe.page'));
const EditRecipePage = lazy(() => import('../../pages/edit.page'));
const MyRecipesPage = lazy(() => import('../../pages/my.recipes'));
const ErrorPage = lazy(() => import('../../pages/error.page'));
export const AppRoutes = () => (
  <Suspense>
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/main" element={<MainPage></MainPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route
        path="/create"
        element={<CreateRecipePage></CreateRecipePage>}
      ></Route>
      <Route
        path="/editpage/:id"
        element={<EditRecipePage></EditRecipePage>}
      ></Route>
      <Route
        path="/myrecipes"
        element={<MyRecipesPage></MyRecipesPage>}
      ></Route>
      <Route path="/details/:id" element={<DetailsPage></DetailsPage>}></Route>
      <Route path="/error" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  </Suspense>
);
