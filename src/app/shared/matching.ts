export interface MatchingIngredient {
  name: string;
  unit: string;
  requiredQuantity: number;
  availableQuantity: number;
  missingQuantity: number;
  available: boolean;
}

export interface RecipeMatch {
  recipeId: string;
  recipeName: string;
  matchPercent: number;

  category:
    'kochbar' |
    'fast kochbar' |
    'nicht kochbar';

  totalIngredients: number;
  matchedIngredients: number;

  presentIngredients: MatchingIngredient[];
  missingIngredients: MatchingIngredient[];
}