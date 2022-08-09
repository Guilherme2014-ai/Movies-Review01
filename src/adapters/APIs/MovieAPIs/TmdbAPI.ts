/* eslint-disable @typescript-eslint/no-explicit-any */
// Acoplação direta ao axios

import axios from "axios";
import { IMovie } from "../../../interfaces/entities/IMovies";
import { IMovieAPI } from "../../../interfaces/IMovieAPI";

export class TmdbAPI implements IMovieAPI {
  private baseUrl = "https://api.themoviedb.org/3";

  async getMoviesByCategory(category: string) {
    const url = getCompleteUrl(
      this.baseUrl,
      `/discover/movie/?with_genres=${category}`,
    );

    const moviesResponse = await axios.get<any>(url);
    const movies = moviesResponse.data.results;

    const formattedMovies: IMovie[] = movies.map((movie: any) => {
      const formattedMovie: IMovie = {
        id: movie.id,
        title: movie.title,
        image_url: movie.poster_path,
        overview: movie.overview,
        date: movie.release_date,
      };

      return formattedMovie;
    });

    return formattedMovies;
  }
}

const getCompleteUrl = (baseUrl: string, url: string) =>
  `${baseUrl}${url}&api_key=83e652827308ec05ca644a1e103cceec&language=en-US`;
