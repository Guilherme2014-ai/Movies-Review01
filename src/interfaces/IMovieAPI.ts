import { IMovie } from "./entities/IMovies";

export interface IMovieAPI {
  getMoviesByCategory(category: string): Promise<IMovie[]>;
  // getCommingMovies(): Promise<IMovie[]>;
}
