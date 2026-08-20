import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiURL = 'http://localhost:3000/api';


  // READ - alle Zutaten
  async getAllIngredients(): Promise<Ingredient[]> {

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


  // READ - eine bestimmte Zutat
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


  // CREATE
  async createIngredient(
    ingredient: Ingredient
  ): Promise<Ingredient> {

    const response = await fetch(
      this.apiURL + '/ingredients',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(ingredient)
      }
    );

    if (!response.ok) {
      throw new Error(
        'Zutat konnte nicht gespeichert werden'
      );
    }

    return await response.json();
  }


  // UPDATE
  async updateIngredient(
    id: string,
    ingredient: Partial<Ingredient>
  ): Promise<Ingredient> {

    const response = await fetch(
      this.apiURL + '/ingredients/' + id,
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(ingredient)
      }
    );

    if (!response.ok) {
      throw new Error(
        'Zutat konnte nicht geändert werden'
      );
    }

    return await response.json();
  }


  // DELETE
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

}