const Users = require("./user-model.js");
const request = require("supertest");

const server = require("../../api/server");

const db = require("../../database/dbConfig");

describe("user model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("add()", () => {
    it("adds a user to the database", async () => {
      await Users.add({ username: "adela", password: "adela" });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
    it("should return a JSON object", () => {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  describe("find()", () => {
    it("finds a user in the database after adding one", async () => {
      await Users.add({ username: "adela", password: "pass" });
      await Users.find();
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
  it("adds the user adela and returns it as an array", async () => {
    await Users.add({ username: "adela", password: "pass" });
    await Users.find();
    const users = await db("users");
    expect(Array.isArray(users)).toBe(true);
  });
  it("creates the user adela and returns the username", async () => {
    await Users.add({ username: "adela", password: "pass" });
    await Users.findById(1).then(user => {
      expect(user.username).toMatch(/adela/i);
    });
  });
});