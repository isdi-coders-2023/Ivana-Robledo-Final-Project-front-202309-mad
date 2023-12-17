import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/recipes.hook';
import React from 'react';
import styles from './edit.page.module.scss';
/* Import Swal from 'sweetalert2'; */

export default function EditRecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loadAllRecipes, updateCurrentRecipe, recipes, recipeUpdateState } =
    useRecipes();

  const foundRecipe = recipes.find((recipes) => recipes.id === id);

  const [findRecipe, setRecipe] = useState(foundRecipe);

  useEffect(() => {
    if (findRecipe) {
      setRecipe(findRecipe);
    }
  }, [findRecipe]);

  useEffect(() => {
    loadAllRecipes();
  }, [recipeUpdateState]);

  /*   UseEffect(() => {
    if (recipeUpdateState === 'loading') return;
    if (recipeUpdateState === 'idle') {
      Swal.fire({
        title: 'Listo!',
        text: 'Tu receta ha sido modificada correctamente',
        imageUrl:
          'https://images.unsplash.com/photo-1462475279937-40cb2b162a99?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });
    }
  }); */

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setRecipe((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleUpdate = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const updatedFormData = new FormData(formElement);
    updateCurrentRecipe(findRecipe!.id, updatedFormData);
    navigate('/main');
  };

  return (
    <div className={styles.titleAndForm}>
      <h2>Edita tu receta</h2>
      <form
        onSubmit={handleUpdate}
        className={styles.createRecipeForm}
        role="form"
      >
        <input
          type="text"
          name="recipeName"
          value={findRecipe?.recipeName}
          onChange={handleInputChange}
        />

        <textarea
          name="ingredients"
          value={findRecipe?.ingredients}
          onChange={handleInputChange}
          required
        ></textarea>
        <textarea
          name="description"
          value={findRecipe?.description}
          onChange={handleInputChange}
        ></textarea>
        <select
          name="category"
          id="category"
          value={findRecipe?.category}
          onChange={handleInputChange}
          required
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
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
