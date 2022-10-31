const request = require("supertest");
const app = require("../app");
const test = require(".");

const registerData = { email: "shane3@example.com", password: "shane" };
const loginData = { email: "shane1@example.com", password: "shane" };
const basePath = "users";

describe("User test", () => {
  beforeAll(async () => {
    await test.setUp();
  });

  afterAll(async () => {
    await test.tearDown();
  });

  it("pass: get all users", async () => {
    response = await request(app).get(`/${basePath}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  it("pass: register a user", async () => {
    response = await request(app)
      .post(`/${basePath}/register`)
      .send(registerData);
    expect(response.statusCode).toBe(200);
  });

  it("fail: register a user: missing required field", async () => {
    data = { email: registerData.email };
    response = await request(app).post(`/${basePath}/register`).send(data);
    expect(response.statusCode).toBe(400);
  });

  it("pass: login a user", async () => {
    response = await request(app).post(`/${basePath}/login`).send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(loginData.email);
  });

  it("fail: login a user: wrong email", async () => {
    data = { email: "hampton@example.com", password: loginData.password };
    response = await request(app).post(`/${basePath}/login`).send(data);
    expect(response.statusCode).toBe(401);
  });

  it("fail: login a user: wrong password", async () => {
    data = { email: loginData.email, password: "badpassword" };
    response = await request(app).post(`/${basePath}/login`).send(data);
    expect(response.statusCode).toBe(401);
  });
});
