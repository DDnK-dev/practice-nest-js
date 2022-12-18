export declare class MoviesController {
    getaAll(): string;
    search(searchingYear: string): string;
    getOne(movieId: string): string;
    create(movieData: any): any;
    remove(movieId: string): string;
    patch(movieId: string, updateData: any): any;
}
