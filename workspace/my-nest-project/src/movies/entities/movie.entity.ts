// 실제 DB 모델이 들어가야 정상이지만, 우린 간단한 json으로 대체 할 것이다.

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
