import { Controller, Delete, Post, Get, Param, Patch } from '@nestjs/common';

@Controller('movies') // URL에 movies가 붙음
export class MoviesController {
  @Get()
  getaAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) { // id를 movieId로 받음
    return `This will return one movie with id : ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie with the id: ${movieId}`;
  }
}
