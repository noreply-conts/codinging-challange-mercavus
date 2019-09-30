import { UserService } from "./UserService";
import { ReturnModelType } from "@typegoose/typegoose";
import { UserModel } from "../models/UserModel";
import { PlainObjectOf } from "../utils/PlainObject";
import { NotFoundHttpError } from "../errors/HttpErrors";
import { mocked } from "ts-jest";

describe("UserService", () => {
  const user = new UserModel();
  user.id = "someId";
  user.name = "someName";
  const userList = [user];
  const userModel = ({
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    create: jest.fn(),
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

  describe("addUser", () => {
    it("creates a new user  ", async () => {
      const plainUser = ({ id: "someId" } as unknown) as PlainObjectOf<
        UserModel
      >;
      await service.addUser(plainUser);
      expect(userModel.create).toHaveBeenCalledWith(plainUser);
    });
  });

  describe("deleteUser", () => {
    it("throws not found on missing id  ", async () => {
      mocked(userModel.deleteOne).mockResolvedValueOnce({ deletedCount: 0 });
      await expect(service.deleteUserById(user.id)).rejects.toThrow(
        NotFoundHttpError
      );
    });
    it("deletes the user by id  ", async () => {
      await service.deleteUserById(user.id);
      expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: user.id });
    });
  });
});
