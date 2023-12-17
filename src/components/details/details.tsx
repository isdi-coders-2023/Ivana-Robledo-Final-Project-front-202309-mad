import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
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
        title: 'Hecho!',
        text: 'Tu receta ha sido eliminada correctamente',
        imageUrl:
          'https://images.unsplash.com/photo-1462475279937-40cb2b162a99?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });

      navigate('/main');
    }

    if (recipeDeleteState === 'error') navigate('/error');
  }, [recipeDeleteState, navigate]);

  const handleUpdate = () => <EditRecipePage></EditRecipePage>;

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
        </div>
      </div>
    </>
  );
}
