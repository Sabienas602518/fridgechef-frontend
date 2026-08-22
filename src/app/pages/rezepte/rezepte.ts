import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../shared/backend';
import { Recipe } from '../../shared/recipe';

@Component({
  selector: 'app-rezepte',
  imports: [RouterLink],
  templateUrl: './rezepte.html',
  styleUrl: './rezepte.css'
})
export class Rezepte implements OnInit {

  private bs = inject(BackendService);
  private cdr = inject(ChangeDetectorRef);

  recipes: Recipe[] = [];
  recipeToDelete: Recipe | null = null;

  deleteStatus = false;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadRecipes();
  }

  async loadRecipes() {
    this.loading = true;
    this.errorMessage = '';

    try {
      this.recipes = await this.bs.getAllRecipes();

    } catch {
      this.errorMessage = 'Rezepte konnten nicht geladen werden.';

    } finally {
      this.loading = false;

      // Angular mitteilen:
      // Die Daten haben sich nach dem fetch geändert.
      this.cdr.markForCheck();
    }
  }

  delete(recipe: Recipe): void {
    this.recipeToDelete = recipe;
    this.deleteStatus = true;
  }

  async confirmDelete() {
    if (!this.recipeToDelete?._id) {
      return;
    }

    try {
      await this.bs.deleteRecipe(this.recipeToDelete._id);

      this.deleteStatus = false;
      this.recipeToDelete = null;

      await this.loadRecipes();

    } catch {
      this.errorMessage = 'Rezept konnte nicht gelöscht werden.';
      this.cdr.markForCheck();
    }
  }

  cancelDelete(): void {
    this.deleteStatus = false;
    this.recipeToDelete = null;
  }
}