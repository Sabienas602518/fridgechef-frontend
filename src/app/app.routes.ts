   import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Vorrat } from './pages/vorrat/vorrat';
import { VorratDetail } from './pages/vorrat-detail/vorrat-detail';
import { Rezepte } from './pages/rezepte/rezepte';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'vorrat', component: Vorrat },
    { path: 'vorrat/:id', component: VorratDetail },
    { path: 'rezepte', component: Rezepte },
    { path: '**', redirectTo: '' }
];