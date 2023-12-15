/* Import { Link } from 'react-router-dom'; */
import styles from './card.module.scss';
import { Recipe } from '../../entities/recipe';
import { useRecipes } from '../../hooks/recipes.hook';
import { Link } from 'react-router-dom';

type Props = {
  recipe: Recipe;
};

export function Card({ recipe }: Props) {
  const { handleDetailsPage } = useRecipes();

  return (
    <>
      <div className={styles.card}>
        <article>
          <figure>
            <img
              src={recipe.img.url}
              alt={`imagen de ${recipe.recipeName}`}
              className={styles.recipeImg}
            ></img>
          </figure>
          <div className="card-info-container">
            <div className={styles.cardtitle}>
              <p className={styles.cardtitleP}>{recipe.recipeName}</p>
            </div>
            <div className={styles.cardIngredients}>
              <p className={styles.cardIngredientsP}>{recipe.ingredients}</p>
            </div>
            <div className={styles.cardDescription}>
              <p className={styles.cardDescriptionP}>{recipe.description}</p>
            </div>
          </div>
          <button className="details">
            <Link
              to={'/details/' + recipe.id}
              onClick={() => handleDetailsPage(recipe)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Show Details
            </Link>
          </button>
        </article>
      </div>
    </>
  );
}
