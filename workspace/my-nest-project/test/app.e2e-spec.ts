import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// 종종 E2E 테스트를 더 좋아하는 사람들도 있음. (생각하기 더 쉬워서?)
// 여기선 movie와 관련된 app의 모든 부분을 테스트함. supertest 라이브러리를 사용한다.
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(); // app 을 생성하는 부분
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // request와 expect로 값을 검증하는 부분
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]); // 200 상태의 비어있는 객체를 받을 것을 예상...
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  // 이렇게 테스트할 때 나타날 수 있는 문제점은..?
  // 매 테스트마다 App을 생상하고있음. 이전 테스트의 결과가 이후 테스트에 영향을 주게 만들고 싶으면
  // foreEache 를 for all로 바꾸면 됨
  // 또한 테스트 어플리케이션도 실제 Run 환경과 똑같이 맞춰줘야 함... (pipe 라던지)
  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
