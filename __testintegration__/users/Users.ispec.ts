import * as request from "supertest";
import { getIntegrationTestApiUri } from "../utils";
import { fixtures } from "../fixtures";
import { HobbyModel } from "../../src/models/HobbyModel";
import _ = require("lodash");

describe("Users", () => {
  describe("GET /users", () => {
    it("returns list of users", async () => {
      const result = await request(getIntegrationTestApiUri()).get("/users");
      expect(result.body).toHaveLength(Object.keys(fixtures).length);
    });
  });

  describe("GET /users/{id}", () => {
    it("returns user by id", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/${fixtures.user1.id}`
      );
      expect(result.body).toEqual(
        expect.objectContaining(_.omit(fixtures.user1, "hobbies"))
      );
    });
    it("returns 404 for not found user", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/notExitingUser`
      );
      expect(result.status).toEqual(404);
    });
  });

  describe("GET /users/{id}/hobbies", () => {
    it("returns hobbies of user", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/${fixtures.user1.id}/hobbies`
      );
      expect(result.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(fixtures.user1.hobbies![0] as HobbyModel)
        ])
      );
    });
    it("returns 404 for not found user", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/notExitingUser/hobbies`
      );
      expect(result.status).toEqual(404);
    });
  });

  describe("POST /users", () => {
    it("creates new user", async () => {
      const result = await request(getIntegrationTestApiUri())
        .post(`/users`)
        .send({
          name: "someCoolName"
        });
      expect(result.status).toEqual(200);
    });
    it("returns 422 for invalid input", async () => {
      const result = await request(getIntegrationTestApiUri())
        .post(`/users`)
        .send({
          name: "sh"
        });
      expect(result.status).toEqual(422);
      expect(result.body).toEqual(
        expect.objectContaining({
          attributes: expect.objectContaining({
            name: expect.any(Object)
          })
        })
      );
    });
  });

  describe("POST /users/{id}/hobbies", () => {
    it("creates new hobby for a user", async () => {
      const result = await request(getIntegrationTestApiUri())
        .post(`/users/${fixtures.user1.id}/hobbies`)
        .send({
          name: "someCoolName"
        });
      expect(result.status).toEqual(200);
    });
    it("returns 422 for invalid input", async () => {
      const result = await request(getIntegrationTestApiUri())
        .post(`/users/${fixtures.user1.id}/hobbies`)
        .send({
          name: "sh"
        });
      expect(result.status).toEqual(422);
      expect(result.body).toEqual(
        expect.objectContaining({
          attributes: expect.objectContaining({
            name: expect.any(Object)
          })
        })
      );
    });
  });
  describe("DELETE /users/{id}", () => {
    it("deletes user by id", async () => {
      const result = await request(getIntegrationTestApiUri())
        .delete(`/users/${fixtures.userToDelete.id}`)
        .send();
      expect(result.status).toEqual(200);
    });
    it("returns 404 for not found user", async () => {
      const result = await request(getIntegrationTestApiUri())
        .delete(`/users/notExitingUser`)
        .send();
      expect(result.status).toEqual(404);
    });
  });
});
