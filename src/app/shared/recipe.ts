export interface RecipeIngredient {

  name: string;

  quantity: number;

  unit: string;

}


export interface Recipe {

  _id?: string;

  name: string;

  description: string;

  duration: number;

  servings: number;

  difficulty: string;

  ingredients: RecipeIngredient[];

  instructions: string[];

}