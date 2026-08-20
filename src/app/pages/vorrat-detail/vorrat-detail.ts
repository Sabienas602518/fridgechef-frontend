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

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { BackendService }
  from '../../shared/backend';

import { Ingredient }
  from '../../shared/ingredient';


@Component({
  selector: 'app-vorrat-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './vorrat-detail.html',
  styleUrl: './vorrat-detail.css'
})
export class VorratDetail implements OnInit {

  private bs = inject(BackendService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);


  ingredient!: Ingredient;

  id: string | null = '';


  form = new FormGroup({

    nameControl: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ),

    quantityControl:
      new FormControl<number | null>(
        1,
        [
          Validators.required,
          Validators.min(0.01)
        ]
      ),

    unitControl: new FormControl(
      '',
      Validators.required
    ),

    categoryControl: new FormControl(
      '',
      Validators.required
    ),

    expiryDateControl:
      new FormControl('')
  });


  ngOnInit(): void {

    this.id =
      this.route.snapshot.paramMap.get('id');

    if (!this.id) {
      this.router.navigate(['/vorrat']);
      return;
    }


    this.bs
      .getOneIngredient(this.id)
      .then(response => {

        this.ingredient = response;


        this.form.patchValue({

          nameControl:
            this.ingredient.name,

          quantityControl:
            this.ingredient.quantity,

          unitControl:
            this.ingredient.unit,

          categoryControl:
            this.ingredient.category,

          expiryDateControl:
            this.ingredient.expiryDate
              ? new Date(
                  this.ingredient.expiryDate
                )
                  .toISOString()
                  .slice(0, 10)
              : ''
        });
      })
      .catch(() => {

        this.router.navigate(['/vorrat']);

      });
  }


  update(): void {

    if (
      this.form.invalid ||
      !this.id
    ) {

      this.form.markAllAsTouched();

      return;
    }


    const values =
      this.form.value;


    const updateData:
      Partial<Ingredient> = {

      name:
        values.nameControl ?? '',

      quantity:
        Number(
          values.quantityControl
        ),

      unit:
        values.unitControl ?? '',

      category:
        values.categoryControl ?? '',

      expiryDate:
        values.expiryDateControl
          ? new Date(
              values.expiryDateControl
            )
          : undefined
    };


    this.bs
      .updateIngredient(
        this.id,
        updateData
      )
      .then(() => {

        this.router.navigate([
          '/vorrat'
        ]);

      });
  }


  cancel(): void {

    this.router.navigate([
      '/vorrat'
    ]);

  }

}