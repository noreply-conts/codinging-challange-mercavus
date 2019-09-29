import { UserService } from "./UserService";
import { ReturnModelType } from "@hasezoey/typegoose";
import { UserModel } from "../models/UserModel";

describe("UserService", () => {
  const user = new UserModel();
  user.id = "someId";
  user.name = "someName";
  const userList = [user];
  const userModel = ({
    find: jest.fn().mockResolvedValue(userList),
    findById: jest.fn().mockResolvedValue(user)
  } as unknown) as ReturnModelType<typeof UserModel>;

  const service = new UserService(userModel);

  describe("getUsers", () => {
    it("returns list of users", async () => {
      const result = await service.getUsers();
      expect(result).toEqual(userList);
    });
  });

  describe("getUsersById", () => {
    it("returns user for specific id ", async () => {
      const result = await service.getUserById(user.id);
      expect(result).toEqual(user);
    });
  });
});
