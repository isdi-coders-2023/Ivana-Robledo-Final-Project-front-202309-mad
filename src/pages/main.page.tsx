// MainPage.jsx

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List } from '../components/list/list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from './main.page.module.scss';
import { useRecipes } from '../hooks/recipes.hook';
import { useEffect } from 'react';

export default function MainPage() {
  const { recipes, recipeUpdateState, recipeState } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/myrecipes/';
  /* Const { loggedUser } = useSelector((state: RootState) => state.UsersState); */
  const { loadAllRecipes } = useRecipes();

  useEffect(() => {
    loadAllRecipes();
  }, [recipeUpdateState || recipeState]);

  const category2Recipes = recipes.filter(
    (recipe) => recipe.category === 'Galletas'
  );
  const category3Recipes = recipes.filter(
    (recipe) => recipe.category === 'Tortas'
  );

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.createLinkButton}>
        <Link to={'/create'}>
          <button type="button">Crea receta</button>
        </Link>
      </div>
      <div className={styles.myRecipesLinkButton}>
        {!isProfilePage && (
          <button
            data-testid="button"
            className={styles.myrecipesbutton}
            onClick={() => navigate('/myrecipes')}
          >
            Mis recetas
          </button>
        )}
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.category}>
          <h2>Galletas</h2>
          <List recipesToRender={category2Recipes} />
        </div>
        <div className={styles.category}>
          <h2>Torta</h2>
          <List recipesToRender={category3Recipes} />
        </div>
      </div>
    </div>
  );
}
