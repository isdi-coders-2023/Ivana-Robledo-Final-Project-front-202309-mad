import { serverUrl } from '../config';
import { Recipe } from '../entities/recipe';

export class ApiRepoRecipes {
  apiUrl = serverUrl + '/recipes';

  async createRecipe(newRecipe: FormData): Promise<Recipe> {
    const url = this.apiUrl + '/create';
    const response = await fetch(url, {
      method: 'POST',
      body: newRecipe,
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateRecipe(id: string, updatedRecipe: FormData): Promise<Recipe> {
    const url = this.apiUrl + `/update/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: updatedRecipe,
    });

    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteRecipe(id: string): Promise<Recipe> {
    const url = this.apiUrl + `/delete/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return {} as Recipe;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const url = this.apiUrl;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);

    return response.json();
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const url = this.apiUrl + `/find/${id}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);

    return response.json();
  }
}
