export interface OnlineRecipeIngredient {
  name: string;
  measure: string;
  available: boolean;
}

export interface OnlineRecipe {
  id: string;
  title: string;
  image: string;
  instructions: string;
  sourceUrl: string;
  youtube: string;

  matchPercent: number;

  category:
    | 'kochbar'
    | 'fast kochbar'
    | 'nicht kochbar';

  totalIngredients: number;
  matchedIngredients: number;

  ingredients: OnlineRecipeIngredient[];
  missingIngredients: OnlineRecipeIngredient[];
}