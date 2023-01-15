import { MoviesService } from './movies.service';
export declare class MoviesController {
    construcor(private readonly moviesService: MoviesService): void;
    getaAll(): any;
    search(searchingYear: string): any;
    getOne(movieId: string): string;
    create(movieData: any): any;
    remove(movieId: string): string;
    patch(movieId: string, updateData: any): any;
}
