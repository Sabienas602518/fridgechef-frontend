import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../shared/backend';
import { Ingredient } from '../../shared/ingredient';
import { Recipe } from '../../shared/recipe';
import { RecipeMatch } from '../../shared/matching';
import { isExpiringSoon } from '../../shared/expiry';

type MatchFilter =
  'alle' |
  'kochbar' |
  'fast kochbar' |
  'nicht kochbar';

interface RecipeRecommendation {
  recipe: Recipe;
  match: RecipeMatch;
}

@Component({
  selector: 'app-empfehlungen',
  imports: [RouterLink],
  templateUrl: './empfehlungen.html',
  styleUrl: './empfehlungen.css'
})
export class Empfehlungen implements OnInit {

  private bs = inject(BackendService);
  private cdr = inject(ChangeDetectorRef);

  recommendations: RecipeRecommendation[] = [];
  ingredients: Ingredient[] = [];

  loading = true;
  errorMessage = '';
  filter: MatchFilter = 'alle';

  ngOnInit(): void {
    this.loadRecommendations();
  }

  async loadRecommendations() {
    this.loading = true;
    this.errorMessage = '';

    try {
      const recipes = await this.bs.getAllRecipes();

      this.ingredients =
        await this.bs.getAllIngredients();

      const recipesWithId = recipes.filter(
        (recipe): recipe is Recipe & { _id: string } =>
          !!recipe._id
      );

      const recommendations = await Promise.all(
        recipesWithId.map(async recipe => {

          const match =
            await this.bs.getRecipeMatch(recipe._id);

          return {
            recipe,
            match
          };
        })
      );

      this.recommendations = recommendations.sort(
        (a, b) =>
          b.match.matchPercent -
          a.match.matchPercent
      );

    } catch {
      this.errorMessage =
        'Empfehlungen konnten nicht geladen werden. Ist das Backend gestartet?';

    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  setFilter(filter: MatchFilter): void {
    this.filter = filter;
  }

  get filteredRecommendations(): RecipeRecommendation[] {

    if (this.filter === 'alle') {
      return this.recommendations;
    }

    return this.recommendations.filter(
      recommendation =>
        recommendation.match.category ===
        this.filter
    );
  }

  getExpiringIngredients(
    recipe: Recipe
  ): Ingredient[] {

    return this.ingredients.filter(
      ingredient => {

        if (!isExpiringSoon(ingredient)) {
          return false;
        }

        return recipe.ingredients.some(
          recipeIngredient =>
            recipeIngredient.name
              .trim()
              .toLowerCase() ===
            ingredient.name
              .trim()
              .toLowerCase()
        );
      }
    );
  }
}