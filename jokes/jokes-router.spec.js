const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./jokes-router.js");
const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig.js");

describe('/api/jokes', () => {

    describe('GET /', () => {

        test('should return status 400 Bad Request without header', () => {
            return request(server).get('/api/jokes/')
                .expect(400)
        })

        test('should return status 401 Unauthorized with invalid header', () => {
            return request(server).get('/api/jokes/').set('authorization', 'wrong')
                .expect(401)
        })

        })
})