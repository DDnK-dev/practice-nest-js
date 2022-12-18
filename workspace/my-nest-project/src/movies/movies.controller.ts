import {
  Controller,
  Delete,
  Post,
  Get,
  Param,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies') // URL에 movies가 붙음
export class MoviesController {
  construcor(private readonly moviesService: MoviesService) {}

  @Get()
  getaAll() {
    return this.moviesService.getAll();
  }

  // id 보다 아래에 있으면 search가 id로 인식됨...
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return this.moviesService.search(searchingYear);
  }

  // id를 movieId로 받음
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with id : ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
