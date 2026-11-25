import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PopularMoviesPage } from './pages/popular-movies-page/popular-movies-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'popular' },
  { path: 'popular', component: PopularMoviesPage },
  { path: '**', component: NotFoundPage },
];
