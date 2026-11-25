import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PopularMoviesResponse } from '../interfaces/popular-movies.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.themoviedb.org/3';

  getPopularMovies(page = 1): Observable<PopularMoviesResponse> {
    return this.http.get<PopularMoviesResponse>(`${this.baseUrl}/movie/popular`, {
      headers: { Authorization: `Bearer ${environment.tmdbToken}` },
      params: { language: 'es-ES', page },
    });
  }
}
