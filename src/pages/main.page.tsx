// MainPage.jsx

import { Link } from 'react-router-dom';
import { List } from '../components/list/list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styles from './main.page.module.scss'; // Importa tus estilos CSS

export default function MainPage() {
  const { recipes } = useSelector((state: RootState) => state.RecipesState);

  const category1Recipes = recipes.filter(
    (recipe) => recipe.category === 'Mis recetas'
  );
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
      <div className={styles.categoriesContainer}>
        <div className={styles.category}>
          <h2>Mis recetas</h2>
          <List recipesToRender={category1Recipes} />
        </div>
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
