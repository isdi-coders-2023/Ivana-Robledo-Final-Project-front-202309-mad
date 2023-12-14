/* Import { Link } from 'react-router-dom'; */
import { useRecipes } from '../../hooks/recipes.hook';
import { SyntheticEvent } from 'react';
import styles from './recipe.form.module.scss';

export default function RecipeForm() {
  const { createRecipe } = useRecipes();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    /*   Const data:= {
      username: (formElement.elements.namedItem('username') as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      passwd: (formElement.elements.namedItem('passwd') as HTMLInputElement)
        .value,
    } as Partial<Recipe>; */
    createRecipe(formData);
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
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredientes"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripcion de la receta"
        />
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
        {/*  <button type="submit">Crear</button> */}
        {/* <div className="create-button">
          <Link to={'/home'}> */}
        <button type="submit">Crear</button>
        {/*  </Link> */}
        {/*  </div> */}
      </form>
    </div>
  );
}
