import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

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

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './vorrat.html',
  styleUrl: './vorrat.css'
})
export class Vorrat implements OnInit {

  private bs = inject(BackendService);


  // Alle Zutaten aus dem Backend
  ingredients: Ingredient[] = [];


  // Zutat, die gelöscht werden soll
  ingredient: Ingredient | null = null;


  // Steuert die Sicherheitsabfrage
  deleteStatus = false;


  // Ladezustand
  loading = true;


  // Fehlermeldung
  errorMessage = '';


  // Formular zum Hinzufügen
  form = new FormGroup({

    name: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ),

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

    expiryDate:
      new FormControl('')

  });


  ngOnInit(): void {

    this.loadIngredients();

  }


  // READ
  // Alle Zutaten laden
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


  // CREATE
  // Neue Zutat hinzufügen
  async addIngredient() {

    // Formular überprüfen
    if (this.form.invalid) {

      // Damit die Fehlermeldungen
      // im HTML sichtbar werden
      this.form.markAllAsTouched();

      return;

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


      // Formular nach erfolgreichem
      // Speichern zurücksetzen
      this.form.reset({

        name: '',

        quantity: 1,

        unit: '',

        category: '',

        expiryDate: ''

      });


      // Tabelle neu laden
      await this.loadIngredients();


    } catch {

      this.errorMessage =
        'Zutat konnte nicht gespeichert werden.';

    }

  }


  // DELETE vorbereiten
  delete(
    ingredient: Ingredient
  ): void {

    // Ausgewählte Zutat merken
    this.ingredient = ingredient;

    // Sicherheitsabfrage anzeigen
    this.deleteStatus = true;

  }


  // DELETE bestätigen
  confirm(): void {

    if (!this.ingredient?._id) {
      return;
    }


    this.bs
      .deleteIngredient(
        this.ingredient._id
      )
      .then(() => {

        // Sicherheitsabfrage schließen
        this.deleteStatus = false;

        // Auswahl zurücksetzen
        this.ingredient = null;

        // Tabelle aktualisieren
        return this.loadIngredients();

      })
      .catch(() => {

        this.errorMessage =
          'Zutat konnte nicht gelöscht werden.';

      });

  }


  // DELETE abbrechen
  cancel(): void {

    this.deleteStatus = false;

    this.ingredient = null;

  }

}