/* Import { Link } from 'react-router-dom'; */
import { useRecipes } from '../../hooks/recipes.hook';
import { SyntheticEvent } from 'react';
import styles from './recipe.form.module.scss';
import { useNavigate } from 'react-router-dom';

export default function RecipeForm() {
  const navigate = useNavigate();
  const { createRecipe } = useRecipes();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    createRecipe(formData);
    navigate('/main');
  };

  return (
    <div className={styles.titleAndForm}>
      <h2>Crea tu receta</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.createRecipeForm}
        role="form"
      >
        <input
          type="text"
          name="recipeName"
          placeholder="Titulo de la receta"
        />
        <textarea
          name="ingredients"
          placeholder="Ingredientes (uno por línea)"
          required
        ></textarea>
        <textarea
          name="description"
          placeholder="Descripcion de la receta"
        ></textarea>
        <select
          name="category"
          id="category"
          required
          placeholder="Elige categoria"
        >
          <option value="Galletas">Galletas</option>
          <option value="Tortas">Tortas</option>
        </select>
        <input
          type="file"
          name="img"
          id="img"
          placeholder="Inserta aqui la imagen "
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
