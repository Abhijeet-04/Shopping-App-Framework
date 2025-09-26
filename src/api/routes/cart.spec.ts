import supertest from 'supertest';
import * as app from '../../app';
import express from 'express';
import routes from '../../api';

describe("Cart API", () => {
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

  describe("POST /api/cart/add", () => {
    it("should return 401 Unauthorized when no token is provided", async () => {
      const res = await request
        .post("/api/cart/add")
        .send({ productId: "a-product-id", quantity: 1 });
      expect(res.status).toBe(401);
    });
  });
});
