import {ChangeDetectorRef,Component, inject,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { BackendService } from '../../shared/backend';
import { Ingredient } from '../../shared/ingredient';
import {
  getExpiryClass as calculateExpiryClass,
  getExpiryStatus as calculateExpiryStatus,
  parseGermanDate } from '../../shared/expiry';


@Component({
  selector: 'app-vorrat',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './vorrat.html',
  styleUrl: './vorrat.css'
})
export class Vorrat implements OnInit {

  private bs = inject(BackendService);
  private cdr = inject(ChangeDetectorRef);

  ingredients: Ingredient[] = [];

  ingredient: Ingredient | null = null;

  deleteStatus = false;

  loading = true;

  saving = false;

  errorMessage = '';


  form = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    quantity:
      new FormControl<number | null>(
        1,
        [
          Validators.required,
          Validators.min(0.01)
        ]
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
        'Vorrat konnte nicht geladen werden. Ist das Backend gestartet?';

    } finally {

      this.loading = false;

      this.cdr.markForCheck();
    }
  }


  async addIngredient() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    let expiryDate:
      Date | undefined = undefined;


    const expiryValue =
      this.form.value.expiryDate ?? '';


    if (expiryValue) {

      expiryDate =
        parseGermanDate(expiryValue);


      if (!expiryDate) {

        this.errorMessage =
          'Bitte das Ablaufdatum als TT/MM/JJJJ eingeben.';

        return;
      }
    }


    const ingredient: Ingredient = {

      name:
        this.form.value.name ?? '',

      quantity:
        Number(
          this.form.value.quantity
        ),

      unit:
        this.form.value.unit ?? '',

      category:
        this.form.value.category ?? '',

      expiryDate
    };


    this.saving = true;
    this.errorMessage = '';


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


    } finally {

      this.saving = false;

      this.cdr.markForCheck();
    }
  }


  getExpiryStatus(
    ingredient: Ingredient
  ): string {

    return calculateExpiryStatus(
      ingredient
    );
  }


  getExpiryClass(
    ingredient: Ingredient
  ): string {

    return calculateExpiryClass(
      ingredient
    );
  }


  delete(
    ingredient: Ingredient
  ): void {

    this.ingredient = ingredient;

    this.deleteStatus = true;
  }


  confirm(): void {

    if (!this.ingredient?._id) {
      return;
    }


    this.bs
      .deleteIngredient(
        this.ingredient._id
      )
      .then(() => {

        this.deleteStatus = false;

        this.ingredient = null;

        return this.loadIngredients();

      })
      .catch(() => {

        this.errorMessage =
          'Zutat konnte nicht gelöscht werden.';

        this.cdr.markForCheck();
      });
  }


  cancel(): void {

    this.deleteStatus = false;

    this.ingredient = null;
  }
}