import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BackendService }
  from '../../shared/backend';

import { Ingredient }
  from '../../shared/ingredient';


@Component({
  selector: 'app-vorrat',
  imports: [ReactiveFormsModule],
  templateUrl: './vorrat.html',
  styleUrl: './vorrat.css'
})
export class Vorrat implements OnInit {

  private bs = inject(BackendService);

  ingredients: Ingredient[] = [];

  loading = true;

  errorMessage = '';


  form = new FormGroup({

    name: new FormControl(
      '',
      Validators.required
    ),

    quantity: new FormControl(
      1,
      Validators.required
    ),

    unit: new FormControl(
      '',
      Validators.required
    ),

    category: new FormControl(
      '',
      Validators.required
    ),

    expiryDate: new FormControl('')
  });


  ngOnInit(): void {
    this.loadIngredients();
  }


  async loadIngredients() {

    this.loading = true;
    this.errorMessage = '';

    try {

      this.ingredients =
        await this.bs.getAllIngredients();

    } catch {

      this.errorMessage =
        'Vorrat konnte nicht geladen werden.';

    } finally {

      this.loading = false;

    }
  }


  async addIngredient() {

    if (this.form.invalid) {
      return;
    }

    const ingredient: Ingredient = {

      name:
        this.form.value.name ?? '',

      quantity:
        Number(this.form.value.quantity),

      unit:
        this.form.value.unit ?? '',

      category:
        this.form.value.category ?? '',

      expiryDate:
        this.form.value.expiryDate
          ? new Date(
              this.form.value.expiryDate
            )
          : undefined
    };


    try {

      await this.bs.createIngredient(
        ingredient
      );

      this.form.reset({
        name: '',
        quantity: 1,
        unit: '',
        category: '',
        expiryDate: ''
      });

      await this.loadIngredients();

    } catch {

      this.errorMessage =
        'Zutat konnte nicht gespeichert werden.';

    }
  }
}