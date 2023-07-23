import * as request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(global.app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
