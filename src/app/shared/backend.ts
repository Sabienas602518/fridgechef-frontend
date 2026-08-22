import { Injectable } from '@angular/core';

import { Ingredient } from './ingredient';

import { Recipe } from './recipe';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiURL =
    'http://localhost:3000/api';


  

  // Alle Zutaten laden
  async getAllIngredients():
    Promise<Ingredient[]> {

    const response = await fetch(
      this.apiURL + '/ingredients'
    );


    if (!response.ok) {

      throw new Error(
        'Zutaten konnten nicht geladen werden'
      );

    }


    return await response.json();

  }


  // Eine Zutat laden
  async getOneIngredient(
    id: string
  ): Promise<Ingredient> {

    const response = await fetch(
      this.apiURL + '/ingredients/' + id
    );


    if (!response.ok) {

      throw new Error(
        'Zutat konnte nicht geladen werden'
      );

    }


    return await response.json();

  }


  // Zutat erstellen
  async createIngredient(
    ingredient: Ingredient
  ): Promise<Ingredient> {

    const response = await fetch(
      this.apiURL + '/ingredients',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(
            ingredient
          )
      }
    );


    if (!response.ok) {

      throw new Error(
        'Zutat konnte nicht gespeichert werden'
      );

    }


    return await response.json();

  }


  // Zutat bearbeiten
  async updateIngredient(
    id: string,
    ingredient: Partial<Ingredient>
  ): Promise<Ingredient> {

    const response = await fetch(
      this.apiURL + '/ingredients/' + id,
      {
        method: 'PATCH',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(
            ingredient
          )
      }
    );


    if (!response.ok) {

      throw new Error(
        'Zutat konnte nicht geändert werden'
      );

    }


    return await response.json();

  }


  // Zutat löschen
  async deleteIngredient(
    id: string
  ): Promise<void> {

    const response = await fetch(
      this.apiURL + '/ingredients/' + id,
      {
        method: 'DELETE'
      }
    );


    if (!response.ok) {

      throw new Error(
        'Zutat konnte nicht gelöscht werden'
      );

    }

  }



  // READ - alle Rezepte
 async getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(
    this.apiURL + '/recipes'
  );

  if (!response.ok) {
    throw new Error(
      'Rezepte konnten nicht geladen werden'
    );
  }

  return await response.json();
}


  // READ - ein Rezept
  async getOneRecipe(id: string): Promise<Recipe> {
  const response = await fetch(
    this.apiURL + '/recipes/' + id
  );

  if (!response.ok) {
    throw new Error(
      'Rezept konnte nicht geladen werden'
    );
  }

  return await response.json();
}


  // CREATE
  async createRecipe(
    recipe: Recipe
  ): Promise<Recipe> {

    const response = await fetch(
      this.apiURL + '/recipes',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(recipe)
      }
    );


    if (!response.ok) {

      throw new Error(
        'Rezept konnte nicht gespeichert werden'
      );

    }


    return await response.json();

  }


  // UPDATE
  async updateRecipe(
    id: string,
    recipe: Partial<Recipe>
  ): Promise<Recipe> {

    const response = await fetch(
      this.apiURL + '/recipes/' + id,
      {
        method: 'PATCH',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(recipe)
      }
    );


    if (!response.ok) {

      throw new Error(
        'Rezept konnte nicht geändert werden'
      );

    }


    return await response.json();

  }


  // DELETE
  async deleteRecipe(
    id: string
  ): Promise<void> {

    const response = await fetch(
      this.apiURL + '/recipes/' + id,
      {
        method: 'DELETE'
      }
    );


    if (!response.ok) {

      throw new Error(
        'Rezept konnte nicht gelöscht werden'
      );

    }

  }

}