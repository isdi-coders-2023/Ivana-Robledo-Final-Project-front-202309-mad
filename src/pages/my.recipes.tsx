import { List } from '../components/list/list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from './my.recipes.module.scss';
import { useEffect } from 'react';
import { useRecipes } from '../hooks/recipes.hook';
import { Link } from 'react-router-dom';
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
    <>
      <div className={styles.myRecipesContainer}>
        <h2>Mis recetas</h2>
        <div className={styles.categoryMyList}>
          <List recipesToRender={userRecipes} />
        </div>
      </div>
      <div className={styles.toCreatePage}>
        <p>Quieres crear otra receta?</p>
        <Link to={'/create'}>
          <button type="button" className={styles.createButton}>
            Crea receta
          </button>
        </Link>
      </div>
    </>
  );
}
