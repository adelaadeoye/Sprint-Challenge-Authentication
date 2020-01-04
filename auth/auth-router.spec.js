const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./auth-router.js");
const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig.js");

//Here i want to test the auth endpoint
beforeEach(() => db("users").truncate());
describe("/api/auth", () => {
  //Test the register endpoint
  const username = "adela";
  const password = "adela";
  describe("Post/register", () => {

    

   

    it("should return a status code 201 ", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username, password })
        .expect(201);
    });

    it("should return json", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username, password })
        .then(resp => {
          expect(resp.type).toMatch(/json/i);
        });
    });
  });
  //Test for login endpoint 

  describe('POST/ Login', ()=>{

      const username = 'testing'
        const password = 'password'


        it('should return status 401 ', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .expect(401)
        })

        it('should return json', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })
  })
});
