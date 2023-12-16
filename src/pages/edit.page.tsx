import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/recipes.hook';
import React from 'react';

export default function EditRecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    <div /* className={styles.titleAndForm} */>
      <h2>Edita tu receta</h2>
      <form
        onSubmit={handleUpdate}
        /*  ClassName={styles.createRecipeForm} */
        role="form"
      >
        <label htmlFor="recipeName">
          test
          <input
            type="text"
            name="recipeName"
            value={findRecipe?.recipeName}
            onChange={handleInputChange}
          />
        </label>

        <input
          type="text"
          name="ingredients"
          value={findRecipe?.ingredients}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          value={findRecipe?.description}
          onChange={handleInputChange}
        />
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
