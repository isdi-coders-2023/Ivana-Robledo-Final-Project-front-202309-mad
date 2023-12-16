import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
/* Import { makeImageURL } from '../../services/images'; */
import styles from './details.module.scss';
import { useRecipes } from '../../hooks/recipes.hook';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import EditRecipePage from '../../pages/edit.page';

export function Details() {
  const navigate = useNavigate();
  const { currentRecipe } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const { deleteRecipe, recipeDeleteState } = useRecipes();

  const handleDelete = () => {
    deleteRecipe(currentRecipe!.id);
  };

  useEffect(() => {
    if (recipeDeleteState === 'loading') return;
    if (recipeDeleteState === 'deleted') {
      Swal.fire({
        title: '¡Receta eliminada!',
        width: '20rem',
        padding: '2rem 0',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/main');
    }

    if (recipeDeleteState === 'error') navigate('/error');
  }, [recipeDeleteState, navigate]);

  const handleUpdate = () => <EditRecipePage></EditRecipePage>;

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
        <Link to={'/editpage/' + currentRecipe!.id}>
          <img
            onClick={handleUpdate}
            role="button"
            src="'../../../edit.svg"
            alt="Modify image"
          />
        </Link>
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
