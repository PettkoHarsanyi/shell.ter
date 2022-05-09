import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Issue Tracker', () => {
  const user = { name: 'Tibi Tibi', userName: 'tibi', password: 'tibi' };
  

  let app: INestApplication;
  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(['error']);
    await app.init();

    
    requestHandle = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/users').send(user).expect(201);
    });

    it('should fail on same user registration', async () => {
      await requestHandle.post('/users').send(user).expect(409);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/users/login').send(user).expect(201);
    });
  });

  describe('Dogs Controller',()=>{
    let token: string;

    let createdDog: Record<string, unknown>;

    beforeAll(()=>{
      createdDog = {
        id: 1,
        name: "Szofi",
        age: 5,
        weight: 25,
        strength: 10,
        type: "Labrador",
        createdAt: null,
        updatedAt: null
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/dogs',()=>{
      it('should return empty array', async ()=>{
        await requestHandle.get("/dogs").set('Authorization',token).expect(200).expect([]);
      });

      it("should create a dog", async () => {
        const response = await requestHandle.post("/dogs").set('Authorization',token)
        .send({id: 1,
          name: "Szofi",
          age: 5,
          weight: 25,
          strength: 10,
          type: "Labrador"}).expect(201);

          createdDog.createdAt = response.body.createdAt;
          createdDog.modifiedAt = response.body.updatedAt;

          expect(response.body).toEqual({
            ...createdDog,
            dogs: [],
          });
      });

      it('should return the newly created dog in an array for the user', async () => {
        await requestHandle
          .get('/dogs')
          .set('Authorization', token)
          .expect(200)
          .expect([createdDog]);
      });



    });

    describe('/dogs/:id', ()=>{
      it('should return the requested dog', async () => {
        await requestHandle
          .get('/dogs/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdDog, dogs: [] });
          });
      });

      it('should return 404 when the dog does not exist', async () => {
        await requestHandle
          .get('/dogs/10')
          .set('Authorization', token)
          .expect(404);
      });
    })

  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
