// Prueba básica de endpoint de entrenamientos
const request = require("supertest");
const app = require("../app");

describe("GET /api/entrenamientos", () => {
  it("requiere autenticación", async () => {
    const res = await request(app).get("/api/entrenamientos");
    expect(res.statusCode).toBe(401);
  });
});
