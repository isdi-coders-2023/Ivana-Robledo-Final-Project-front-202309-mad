import { serverUrl } from '../config';
import { Recipe } from '../entities/recipe';

export class ApiRepoRecipes {
  apiUrl = serverUrl + '/recipes';

  constructor(public token: string) {
    this.token = token;
  }

  async createRecipe(newRecipe: FormData): Promise<Recipe> {
    const url = this.apiUrl + '/create';
    const response = await fetch(url, {
      method: 'POST',
      body: newRecipe,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateRecipe(id: string, updatedRecipe: FormData): Promise<Recipe> {
    const url = this.apiUrl + `/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: updatedRecipe,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteRecipe(id: Recipe['id']): Promise<boolean> {
    const url = this.apiUrl + `/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.ok;
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
