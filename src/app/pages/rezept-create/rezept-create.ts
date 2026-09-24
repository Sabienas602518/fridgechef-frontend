import { Component, inject } from '@angular/core';
import {FormArray, FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend';
import { Recipe, RecipeIngredient } from '../../shared/recipe';

@Component({
  selector: 'app-rezept-create',
  imports: [ReactiveFormsModule],
  templateUrl: './rezept-create.html',
  styleUrl: './rezept-create.css'
})
export class RezeptCreate {

  private bs = inject(BackendService);
  private router = inject(Router);

  errorMessage = '';

  form = new FormGroup({

    name: new FormControl(
      '',
      Validators.required
    ),

    description: new FormControl(
      '',
      Validators.required
    ),

    duration: new FormControl<number | null>(
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ),

    servings: new FormControl<number | null>(
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ),

    difficulty: new FormControl(
      '',
      Validators.required
    ),

    ingredients: new FormArray([
      this.createIngredient()
    ]),

    instructions: new FormControl(
      '',
      Validators.required
    )
  });


  createIngredient(): FormGroup {

    return new FormGroup({

      name: new FormControl(
        '',
        Validators.required
      ),

      quantity: new FormControl<number | null>(
        1,
        [
          Validators.required,
          Validators.min(0)
        ]
      ),

      unit: new FormControl(
        '',
        Validators.required
      )

    });
  }


  get ingredients(): FormArray {

    return this.form.controls.ingredients;
  }


  addIngredient(): void {

    this.ingredients.push(
      this.createIngredient()
    );
  }


  removeIngredient(index: number): void {

    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }


  async create() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    const ingredients: RecipeIngredient[] =
      this.ingredients.controls.map(
        ingredientControl => {

          const ingredient =
            ingredientControl.value;

          return {
            name:
              ingredient.name ?? '',

            quantity:
              Number(
                ingredient.quantity
              ),

            unit:
              ingredient.unit ?? ''
          };
        }
      );


    const recipe: Recipe = {

      name:
        this.form.value.name ?? '',

      description:
        this.form.value.description ?? '',

      duration:
        Number(
          this.form.value.duration
        ),

      servings:
        Number(
          this.form.value.servings
        ),

      difficulty:
        this.form.value.difficulty ?? '',

      ingredients:
        ingredients,

      instructions:
        (
          this.form.value.instructions
          ?? ''
        )
          .split('\n')
          .filter(
            instruction =>
              instruction
                .trim()
                .length > 0
          )
    };


    try {

      await this.bs.createRecipe(
        recipe
      );

      await this.router.navigate(
        ['/rezepte']
      );

    } catch {

      this.errorMessage =
        'Rezept konnte nicht gespeichert werden.';
    }
  }


  cancel(): void {
    this.router.navigate(
      ['/rezepte']
    );
  }
}