const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./auth-router.js");
const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig.js");

//Here i want to test the auth endpoint
describe("/api/auth", () => {
  //Test the register endpoint

  describe("Post/register", () => {
    beforeEach(() => db("users").truncate());

    const username = "adela";
    let password = "adela";

    const hash = bcrypt.hashSync(password, 10); // 2 ^ n
    password = hash;

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
      beforeEach(()=>db('users').truncate())

      const username = 'testing'
        const password = 'password'

        // bcrypt.compare = jest.fn((a,b,cb) => {cb(false, a === b)})

        it('should return status 200 Ok', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .expect(200)
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
