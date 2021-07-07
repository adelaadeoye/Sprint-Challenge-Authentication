const request = require("supertest");

const server = require("./server.js");

describe("server.js", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("/ get ",()=>{
      it("should return a 200 ok ", ()=>{
          return request(server)
          .get("/")
          .then(res=>{
              expect(res.status).toBe(200)
          })
      })
  })