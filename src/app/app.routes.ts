import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Vorrat } from './pages/vorrat/vorrat';
import { Rezepte } from './pages/rezepte/rezepte';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'vorrat', component: Vorrat },
    { path: 'rezepte', component: Rezepte },
    { path: '**', redirectTo: '' }
];