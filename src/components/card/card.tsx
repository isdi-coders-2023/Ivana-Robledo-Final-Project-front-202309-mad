/* Import { Link } from 'react-router-dom'; */
import styles from './card.module.scss';
import { makeImageURL } from '../../services/images';
import { Recipe } from '../../entities/recipe';
import { useRecipes } from '../../hooks/recipes.hook';

type Props = {
  recipe: Recipe;
};

export function Card({ recipe }: Props) {
  const { handleDetailsPage /* , deleteRecipe */ } = useRecipes();
  const recipeImage =
    recipe &&
    recipe.img &&
    makeImageURL(recipe?.img.publicId, recipe?.img.height, 150);

  /* Const handleDelete = () => {
    deleteRecipe(recipe.id);
  }; */

  return (
    <>
      {/* <div className="delete-button-container">
        <img
          onClick={handleDelete}
          role="button"
          className=""
          src=""
          alt="Modify image"
        />
      </div> */}
      <div className={styles.Card}>
        {/*  <Link to={'/details' + recipe.id} style={{ textDecoration: 'none' }}> */}
        <article>
          <figure>
            <img
              src={recipeImage}
              alt={`imagen de ${recipe.recipeName}`}
              onClick={() => handleDetailsPage(recipe)}
              className={styles.recipeImg}
            ></img>
          </figure>
        </article>
        {/* </Link> */}
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
      </div>
    </>
  );
}
