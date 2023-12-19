import { List } from '../components/list/list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from './main.page.module.scss';
import { useEffect } from 'react';
import { useRecipes } from '../hooks/recipes.hook';
/* Import { useRecipes } from '../hooks/recipes.hook';
import { useEffect } from 'react'; */

export default function MyRecipesPage() {
  const { recipes, recipeUpdateState } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const { loggedUser } = useSelector((state: RootState) => state.UsersState);
  const { loadAllRecipes } = useRecipes();
  useEffect(() => {
    loadAllRecipes();
  }, [recipeUpdateState]);

  const userRecipes = recipes.filter(
    (recipe) => recipe.author.email === loggedUser?.email
  );

  return (
    <div className={styles.mainPageContainer}>
      <h2>Mis recetas</h2>
      <div className={styles.category}>
        <List recipesToRender={userRecipes} />
      </div>
    </div>
  );
}
