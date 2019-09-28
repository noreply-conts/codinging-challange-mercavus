import * as request from "supertest";
import { getIntegrationTestApiUri } from "../utils";
import { fixtures } from "../fixtures";

describe("Users", () => {
  describe("GET /users", () => {
    it("returns list of users", async () => {
      const result = await request(getIntegrationTestApiUri()).get("/users");
      expect(result.body).toHaveLength(1);
    });
  });

  describe("GET /users/{id}", () => {
    it("returns user by id", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/${fixtures.user1.id}`
      );
      expect(result.body).toEqual(expect.objectContaining(fixtures.user1));
    });
    it.skip("returns 404 for not found user", async () => {
      const result = await request(getIntegrationTestApiUri()).get(
        `/users/notExitingUser`
      );
      expect(result.status).toEqual(404);
    });
  });
});
