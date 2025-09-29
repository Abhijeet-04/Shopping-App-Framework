import supertest from 'supertest';
import * as app from '../../app';
import express from 'express';
import routes from '../../api';
import jwt from 'jsonwebtoken';
import config from '../../config';

describe("Product API", () => {
  let expressApp: express.Application;
  let server: any;
  let request: ReturnType<typeof supertest>;
  let validToken: string;

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

    // Generate a valid token for testing
    validToken = jwt.sign({ id: 'test-user' }, config.jwtSecret, { expiresIn: '1h' });
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /api/products", () => {
    it("should return 401 Unauthorized when no token is provided", async () => {
      const res = await request.get("/api/products");
      expect(res.status).toBe(401);
    });

    it("should return 200 OK with a valid token", async () => {
      const res = await request
        .get("/api/products")
        .set("Authorization", `Bearer ${validToken}`);
      expect(res.status).toBe(200);
    });
  });
});
