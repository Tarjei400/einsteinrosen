import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { SSHServer } from '../ssh/ssh.server';

describe('AppController (e2e)', () => {
  let app;
  let server: SSHServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = moduleFixture.get<SSHServer>(SSHServer);

    await app.init();
  });

  afterAll( () => {
    server.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
});
