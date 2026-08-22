import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../shared/backend';
import { Recipe } from '../../shared/recipe';

@Component({
  selector: 'app-rezept-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './rezept-detail.html',
  styleUrl: './rezept-detail.css'
})
export class RezeptDetail implements OnInit {

  private bs = inject(BackendService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  id: string | null = null;
  recipe: Recipe | null = null;

  loading = true;
  errorMessage = '';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

    duration: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(1)
    ]),

    servings: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(1)
    ]),

    difficulty: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (!this.id) {
      this.router.navigate(['/rezepte']);
      return;
    }

    this.loadRecipe();
  }

  async loadRecipe() {
    if (!this.id) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      this.recipe = await this.bs.getOneRecipe(this.id);

      this.form.patchValue({
        name: this.recipe.name,
        description: this.recipe.description,
        duration: this.recipe.duration,
        servings: this.recipe.servings,
        difficulty: this.recipe.difficulty
      });

    } catch {
      this.errorMessage = 'Rezept konnte nicht geladen werden.';

    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  async update() {
    if (this.form.invalid || !this.id) {
      this.form.markAllAsTouched();
      return;
    }

    const updateData: Partial<Recipe> = {
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      duration: Number(this.form.value.duration),
      servings: Number(this.form.value.servings),
      difficulty: this.form.value.difficulty ?? ''
    };

    try {
      this.recipe = await this.bs.updateRecipe(this.id, updateData);
      await this.router.navigate(['/rezepte']);

    } catch {
      this.errorMessage = 'Rezept konnte nicht geändert werden.';
      this.cdr.markForCheck();
    }
  }

  cancel(): void {
    this.router.navigate(['/rezepte']);
  }
}