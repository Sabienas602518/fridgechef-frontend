import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-vorrat',
  imports: [],
  templateUrl: './vorrat.html',
  styleUrl: './vorrat.css'
})
export class Vorrat {

  ingredients: Ingredient[] = [];

}