import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './details.module.scss';
import { useRecipes } from '../../hooks/recipes.hook';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditRecipePage from '../../pages/edit.page';

export function Details() {
  const { loggedUser } = useSelector((state: RootState) => state.UsersState);

  const navigate = useNavigate();
  const { currentRecipe } = useSelector(
    (state: RootState) => state.RecipesState
  );
  const { deleteRecipe } = useRecipes();

  const handleDelete = () => {
    deleteRecipe(currentRecipe!.id);
    Swal.fire({
      icon: 'success',
      title: 'Tu receta ha sido eliminada exitosamente!',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/main');
  };

  const handleUpdate = () => <EditRecipePage></EditRecipePage>;

  const auth =
    loggedUser &&
    currentRecipe &&
    loggedUser.email === currentRecipe.author.email;

  return (
    <>
      {auth && (
        <div className={styles.deleteButtonContainer}>
          <img
            onClick={handleDelete}
            role="button"
            src="../../../trash-solid.svg"
            alt="Delete image"
          />
        </div>
      )}

      {auth && (
        <div className={styles.editButtonContainer}>
          <Link to={`/editpage/${currentRecipe!.id}`}>
            <img
              onClick={handleUpdate}
              role="button"
              src="../../../edit.svg"
              alt="Modify image"
            />
          </Link>
        </div>
      )}
      <div className={styles.details}>
        <img src={currentRecipe?.img.url} alt="imagen de receta seleccionada" />
        <div>
          <div className={styles.cardName}>
            <p className={styles.cardName}>{currentRecipe?.recipeName}</p>
          </div>
          <div className={styles.ingredients}>
            <p className={styles.ingredients}>{currentRecipe?.ingredients}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.description}>{currentRecipe?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
