import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiURL = 'http://localhost:3000/api';


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
}
