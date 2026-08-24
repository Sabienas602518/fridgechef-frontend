import { ChangeDetectorRef,Component,inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../shared/backend';
import { Recipe } from '../../shared/recipe';
import { RecipeMatch } from '../../shared/matching';
import { Ingredient } from '../../shared/ingredient';


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

  private bs =
    inject(BackendService);

  private cdr =
    inject(ChangeDetectorRef);


  recommendations:
    RecipeRecommendation[] = [];


  ingredients:
    Ingredient[] = [];


  loading = true;

  errorMessage = '';

  filter:
    MatchFilter = 'alle';


  ngOnInit(): void {
    this.loadRecommendations();
  }


  async loadRecommendations() {

    this.loading = true;

    this.errorMessage = '';


    try {

      const recipes =
        await this.bs.getAllRecipes();


      this.ingredients =
        await this.bs.getAllIngredients();


      const recipesWithId =
        recipes.filter(
          (
            recipe
          ): recipe is Recipe & {
            _id: string
          } =>
            !!recipe._id
        );


      const recommendations =
        await Promise.all(

          recipesWithId.map(
            async recipe => {

              const match =
                await this.bs.getRecipeMatch(
                  recipe._id
                );


              return {
                recipe,
                match
              };

            }
          )

        );


      this.recommendations =
        recommendations.sort(
          (a, b) =>
            b.match.matchPercent -
            a.match.matchPercent
        );


    } catch {

      this.errorMessage =
        'Empfehlungen konnten nicht geladen werden.';


    } finally {

      this.loading = false;

      this.cdr.markForCheck();

    }
  }


  setFilter(
    filter: MatchFilter
  ): void {

    this.filter = filter;
  }


  get filteredRecommendations():
    RecipeRecommendation[] {

    if (this.filter === 'alle') {
      return this.recommendations;
    }


    return this.recommendations.filter(
      recommendation =>
        recommendation.match.category ===
        this.filter
    );
  }


  // Prüft, ob eine Vorratszutat
  // bald abläuft.
  isExpiringSoon(
    ingredient: Ingredient
  ): boolean {

    if (!ingredient.expiryDate) {
      return false;
    }


    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const expiryDate =
      new Date(
        ingredient.expiryDate
      );

    expiryDate.setHours(
      0,
      0,
      0,
      0
    );


    const millisecondsPerDay =
      1000 * 60 * 60 * 24;


    const difference =
      Math.ceil(
        (
          expiryDate.getTime() -
          today.getTime()
        ) /
        millisecondsPerDay
      );


    return (
      difference >= 0 &&
      difference <= 3
    );
  }


  // Gibt die bald ablaufenden Zutaten
  // zurück, die ein Rezept verwendet.
  getExpiringIngredients(
    recipe: Recipe
  ): Ingredient[] {

    return this.ingredients.filter(
      ingredient => {

        if (
          !this.isExpiringSoon(
            ingredient
          )
        ) {
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