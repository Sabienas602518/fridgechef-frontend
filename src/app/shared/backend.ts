import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiURL = 'http://localhost:3000/api';

  constructor() { }

  async getAllIngredients(): Promise<Ingredient[]> {

    let response =
      await fetch(this.apiURL + '/ingredients');

    let ingredients = await response.json();

    console.log(
      'ingredients in service (getAllIngredients): ',
      ingredients
    );

    return ingredients;
  }
}
