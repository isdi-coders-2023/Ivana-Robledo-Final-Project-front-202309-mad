import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
/* Import { makeImageURL } from '../../services/images'; */
import styles from './details.module.scss';
import { useRecipes } from '../../hooks/recipes.hook';

export function Details() {
  const { currentRecipe } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const { deleteRecipe } = useRecipes();

  const handleDelete = () => {
    deleteRecipe(currentRecipe!.id); // Fix argument error
  };

  /* Const recipeImg =
    currentRecipe &&
    currentRecipe.img &&
    makeImageURL(currentRecipe.img.publicId, 300, 200); // Updated code
 */
  return (
    <>
      <div className="delete-button-container">
        <img
          onClick={handleDelete}
          role="button"
          className=""
          src="'../../../trash-solid.svg"
          alt="Modify image"
        />
      </div>
      <div className={styles.details}>
        <img src={currentRecipe?.img.url} alt="imagen de receta seleccionada" />
        <div>
          <div className="card-name">
            <p className="card-name">{currentRecipe?.recipeName}</p>
          </div>
          <div className="card-ingredients">
            <p className="card-ingredients">{currentRecipe?.ingredients}</p>
          </div>
          <div className="card-description">
            <p className="card-description">{currentRecipe?.description}</p>
          </div>
          {/* <div className="card-year">
            <p className="card-year">{currentRecipe?.author.username}</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
