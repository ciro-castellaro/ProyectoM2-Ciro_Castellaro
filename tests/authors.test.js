import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Authors endpoints", () => {
  it("GET /authors devuelve 200 y un array", async () => {
    const res = await request(app).get("/authors");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /authors/99999 devuelve 404", async () => {
    const res = await request(app).get("/authors/99999");
    expect(res.status).toBe(404);
  });

  it("POST /authors sin body devuelve 400", async () => {
    const res = await request(app).post("/authors").send({});
    expect(res.status).toBe(400);
  });
});
