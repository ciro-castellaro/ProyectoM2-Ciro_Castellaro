import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Posts endpoints", () => {
  it("GET /posts devuelve 200 y un array", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /posts/99999 devuelve 404", async () => {
    const res = await request(app).get("/posts/99999");
    expect(res.status).toBe(404);
  });

  it("POST /posts sin body devuelve 400", async () => {
    const res = await request(app).post("/posts").send({});
    expect(res.status).toBe(400);
  });
});
