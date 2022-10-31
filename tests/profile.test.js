const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Model = require("../models/profile.model");
const User = require("../models/user.model");
const test = require(".");
const u = require("../utils/util");

const postData = { name: "test-dummy-post" };
const basePath = "profiles";

describe("Profile test", () => {
  beforeAll(async () => {
    await test.setUp();
  });

  afterAll(async () => {
    await test.tearDown();
  });

  it("pass: get all profiles", async () => {
    response = await request(app).get(`/${basePath}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  it("pass: get one profile", async () => {
    let instance = await u.getInstance(Model);
    let _id = instance._id;
    response = await request(app).get(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(200);
  });

  it("fail: get one profile: wrong id format", async () => {
    let _id = mongoose.Types.ObjectId().toString();
    response = await request(app).get(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(400);
  });

  it("fail: get one profile: id not found", async () => {
    let _id = u.generateId(true, "Profile");
    response = await request(app).get(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(404);
  });

  it("pass: post a profile", async () => {
    user = await u.getInstance(User);
    user_id = user._id;
    data = { user_id: user_id, name: "dummy-post" };
    response = await request(app).post(`/${basePath}`).send(data);
    expect(response.statusCode).toBe(201);
  });

  it("fail: post a profile: missing required field", async () => {
    let data = {};
    response = await request(app).post(`/${basePath}`).send(data);
    expect(response.statusCode).toBe(400);
  });

  it("pass: patch a profile", async () => {
    let instance = await u.getInstance(Model);
    let _id = instance._id;
    let name = "test-dummy-patched";
    let patchData = { name: name };
    response = await request(app).patch(`/${basePath}/${_id}`).send(patchData);
    expect(response.statusCode).toBe(200);
    expect(instance.name).not.toBe(response.body.name);
    expect(response.body.name).toBe(name);
  });

  it("pass: patch a profile: optional field", async () => {
    let instance = await u.getInstance(Model);
    let _id = instance._id;
    let location = "patch-location";
    let patchData = { location: location };
    let response = await request(app)
      .patch(`/${basePath}/${_id}`)
      .send(patchData);
    expect(response.statusCode).toBe(200);
    expect(instance.location).not.toBe(response.body.location);
    expect(response.body.location).toBe(location);
  });

  it("fail: patch a profile: wrong id format", async () => {
    let _id = mongoose.Types.ObjectId().toString();
    response = await request(app).patch(`/${basePath}/${_id}`).send({});
    expect(response.statusCode).toBe(400);
  });

  it("fail: patch a profile: id not found", async () => {
    let _id = u.generateId(true, "Profile");
    response = await request(app).patch(`/${basePath}/${_id}`).send({});
    expect(response.statusCode).toBe(404);
  });

  it("pass: delete a profile", async () => {
    let instance = await u.getInstance(Model);
    let _id = instance._id;
    response = await request(app).delete(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(204);
  });

  it("fail: delete a profile: wrong id format", async () => {
    let _id = mongoose.Types.ObjectId().toString();
    response = await request(app).delete(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(400);
  });

  it("fail: delete a profile: id not found", async () => {
    let _id = u.generateId(true, "Profile");
    response = await request(app).delete(`/${basePath}/${_id}`);
    expect(response.statusCode).toBe(404);
  });
});
