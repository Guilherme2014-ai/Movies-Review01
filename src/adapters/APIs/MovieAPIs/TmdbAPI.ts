/* eslint-disable @typescript-eslint/no-explicit-any */
// Acoplação direta ao axios

import axios from "axios";
import { IMovie } from "../../../interfaces/entities/IMovies";
import { IMovieAPI } from "../../../interfaces/IMovieAPI";

export class TmdbAPI implements IMovieAPI {
  private baseUrl = "https://api.themoviedb.org/3";

  async getMoviesByCategory(category: string) {
    try {
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
    } catch (e) {
      throw e;
    }
  }
  async getMovieById(id: string) {
    try {
      const url = getCompleteUrl(this.baseUrl, `/movie/${id}`);

      const movieDetailsResponse = await axios.get<any>(url);
      const movieDetails = movieDetailsResponse.data;

      const movieDetailsFormatted: IMovie = {
        id: movieDetails.id,
        title: movieDetails.title,
        image_url: movieDetails.poster_path,
        overview: movieDetails.overview,
        date: movieDetails.release_date,
      };

      return movieDetailsFormatted;
    } catch (e) {
      throw e;
    }
  }
}

const getCompleteUrl = (baseUrl: string, url: string) =>
  `${baseUrl}${url}${
    url.includes("?") ? "&" : "?"
  }api_key=83e652827308ec05ca644a1e103cceec&language=en-US`;
