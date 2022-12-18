import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    
    getAll(): Movie[] {
        // 실제 DB에서는 모든 데이터를 가져오는 것이지만, 우리는 간단하게 movies를 리턴한다.
        return this.movies;
    }
    
    getOne(id: string): Movie {
        // +id는 string을 number로 바꿔준다.
        return this.movies.find((movie) => movie.id === +id);
    }
    
    deleteOne(id: string) {
        this.movies = this.movies.filter((movie) => movie.id !== +id);
    }
    
    create(movieData) {
        this.movies.push({
        id: this.movies.length + 1,
        ...movieData,
        });
    }
    
    update(id: string, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
  
}
