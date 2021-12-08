const db = require("../db/db");
const express = require("express");
const request = require("supertest");
const app = require("../app");
const { describe } = require("jest-circus");

describe("Mountains API Tests", () => {
  describe("mountain endpoints", () => {
    describe("/api/mountains happy path", () => {
      it("Status 200: GET returns all mountains data", () => {
        return request(app)
          .get("/api/mountains")
          .expect(200)
          .then(({ body }) => {
            expect(body.mountains.length).toBe(8);
          });
      });
      it("Status 200: GET sorts all mountain data", () => {
        return request(app)
          .get("/api/mountains?sortBy=metres")
          .expect(200)
          .then(({ body }) => {
            expect(body.mountains[0].metres).toBe(1182.8);
            expect(body.mountains[7].metres).toBe(1309);
          });
      });
      it("Status 200: GET orders all mountain data", () => {
        return request(app)
          .get("/api/mountains?orderBy=DESC")
          .expect(200)
          .then(({ body }) => {
            expect(body.mountains[0].hillname).toBe("Carn Mor Dearg");
            expect(body.mountains[7].hillname).toBe("Aonach Beag");
          });
      });
      it("Status 200: GET sorts and orders all mountain data", () => {
        return request(app)
          .get("/api/mountains?sortBy=metres&orderBy=DESC")
          .expect(200)
          .then(({ body }) => {
            expect(body.mountains[0].metres).toBe(1309);
            expect(body.mountains[7].metres).toBe(1182.8);
          });
      });
    });

    describe("/api/mountains sad path", () => {
      it("Status 404: wrong url", () => {
        return request(app)
          .get("/api/badurl")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid URL");
          });
      });
      it("Status 400: sortBy bad request", () => {
        return request(app)
          .get("/api/mountains?sortBy=badquery")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad query");
          });
      });
      it("Status 400: orderBy bad request", () => {
        return request(app)
          .get("/api/mountains?orderBy=badquery")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad query");
          });
      });
      it("Status 400: sortBy good & orderBy bad  bad request", () => {
        return request(app)
          .get("/api/mountains?sortBy=feet&orderBy=badquery")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad query");
          });
      });
    });
  });

  describe("/api/mountains/:hillnumber happy path", () => {
    it("Status 200: GET returns single mountain", () => {
      return request(app)
        .get("/api/mountains/141")
        .expect(200)
        .then(({ body }) => {
          expect(body.mountain.hillname).toBe("Ben Lawers");
        });
    });
  });

  describe("/api/mountains/:hillnumber sad path", () => {
    it("Status 404: GET bad hillnumber", () => {
      return request(app)
        .get("/api/mountains/5000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Entry not found");
        });
    });
    it("Status 404: GET bad hillnumber", () => {
      return request(app)
        .get("/api/mountains/bad")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Entry not found");
        });
    });
  });

  describe("user endpoints", () => {
    describe("GET /api/users/:userToken happy path", () => {
      it("Status 200: returns user", () => {
        return request(app)
          .get("/api/users/user1")
          .expect(200)
          .then(({ body }) => {
            expect(body.user.totalFeetClimbed).toBe(4500);
          });
      });
    });
    describe("/api/users/:userToken sad path", () => {
      it("Status 404:  returns user", () => {
        return request(app)
          .get("/api/users/badrequest")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Entry not found");
          });
      });
      it("Status 404: returns user", () => {
        return request(app)
          .get("/api/users/1000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Entry not found");
          });
      });
    });
    describe("POST /api/users/:userToken happy path", () => {
      it.only("Status 200: returns new user", () => {
        return request(app)
          .post("/api/users/user2")
          .expect(201)
          .then(({ body }) => {
            expect(body.user).toEqual({
              userToken: "user2",
              totalFeetClimbed: 0,
              noOfHillsClimbed: 0,
              hillsClimbed: [],
            });
          });
      });
    });
  });
});
