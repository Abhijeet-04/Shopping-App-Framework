import supertest from 'supertest';
import * as app from '../../app';
import express from 'express';
import routes from '../../api';

describe("Hello API", () => {
  let expressApp: express.Application;
  let server: any;
  let request: ReturnType<typeof supertest>;

  beforeAll(async () => {
    const mockApp = express();
    mockApp.use(express.json());
    mockApp.use('/api', routes());
    spyOn(app, 'startServer').and.returnValue(Promise.resolve({
      app: mockApp,
      server: { close: (callback: () => void) => callback() },
    }));
    const { app: returnedApp, server: httpServer } = await app.startServer();
    expressApp = returnedApp;
    server = httpServer;
    request = supertest(expressApp);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /api/hello", () => {
    it("should return 200 OK with 'Hello World'", async () => {
      const res = await request.get("/api/hello");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Hello World' });
    });
  });
});
