// MainPage.jsx

import { Link /* , useLocation, useNavigate */ } from 'react-router-dom';
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
      <div className={styles.mainButtons}>
        <div className={styles.createLinkButton}>
          <Link to={'/create'}>
            <button type="button" className={styles.createButton}>
              Crear receta
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.h2Container}>
          <h2>Galletas</h2>
        </div>
        <div className={styles.category}>
          <List recipesToRender={category2Recipes} />
        </div>
        <div className={styles.h2Container}></div>
        <h2>Tortas</h2>
      </div>
      <div className={styles.category}>
        <List recipesToRender={category3Recipes} />
      </div>
    </div>
  );
}
