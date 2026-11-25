import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Movie } from '../../interfaces/popular-movies.interface';
import { MoviesService } from '../../services/movies.service';

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-popular-movies-page',
  styleUrl: './popular-movies-page.css',
  templateUrl: './popular-movies-page.html',
})
export class PopularMoviesPage implements OnInit {
  private moviesService = inject(MoviesService);

  movies = signal<Movie[]>([]);
  page = signal(1);
  totalPages = signal(1);
  error = signal(false);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.moviesService.getPopularMovies(this.page()).subscribe({
      next: (resp) => {
        this.movies.set(resp.results);
        this.totalPages.set(resp.total_pages);
        this.error.set(false);
      },
      error: () => this.error.set(true),
    });
  }

  cambiarPagina(delta: number) {
    this.page.update((p) => p + delta);
    this.cargar();
    window.scrollTo(0, 0);
  }

  poster(movie: Movie) {
    return movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://placehold.co/342x513?text=Sin+imagen';
  }
}
