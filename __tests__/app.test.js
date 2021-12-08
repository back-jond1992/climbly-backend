const db = require("../db/db");
const express = require("express");
const request = require("supertest");
const app = require("../app");




describe("Mountains API Tests", () => {
  describe("/api/mountains", () => {
    it("Status 200: GET all mountains data", () => {
      return request(app).get("/api/mountains").expect(200).then(({body})=> {
          expect(body.mountains.length).toBe(8)
      })
    });
  })
});

