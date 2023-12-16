import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
/* Import { makeImageURL } from '../../services/images'; */
import styles from './details.module.scss';
import { useRecipes } from '../../hooks/recipes.hook';
import { useNavigate } from 'react-router-dom';

export function Details() {
  const navigate = useNavigate();
  const { currentRecipe } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const { deleteRecipe /* , updateCurrentRecipe  */ } = useRecipes();

  const handleDelete = () => {
    deleteRecipe(currentRecipe!.id);
  };

  navigate('/main');

  const handleUpdate = () => {};

  /* Const recipeImg =
    currentRecipe &&
    currentRecipe.img &&
    makeImageURL(currentRecipe.img.publicId, 300, 200); // Updated code
 */
  return (
    <>
      <div className={styles.deleteButtonContainer}>
        <img
          onClick={handleDelete}
          role="button"
          src="'../../../trash-solid.svg"
          alt="Delete image"
        />
      </div>
      <div className={styles.editButtonContainer}>
        <img
          onClick={handleUpdate}
          role="button"
          src="'../../../edit.svg"
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
