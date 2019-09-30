import { UserService } from "./UserService";
import { ReturnModelType } from "@typegoose/typegoose";
import { UserModel } from "../models/UserModel";
import { PlainObjectOf } from "../utils/PlainObject";
import { NotFoundHttpError } from "../errors/HttpErrors";
import { mocked } from "ts-jest";
import { HobbyService } from "./HobbyService";
import { HobbyModel } from "../models/HobbyModel";

jest.mock("./HobbyService");
describe("UserService", () => {
  const user = new UserModel() as UserModel & {
    save: (options?: any) => Promise<UserModel>;
  };
  const hobbyService = new HobbyService(({} as unknown) as any);

  const hobby = { id: "hobbyId" } as HobbyModel;
  mocked(hobbyService.addHobby).mockResolvedValue(hobby);

  user.id = "someId";
  user.name = "someName";
  user.hobbies = [];
  user.save = jest.fn().mockResolvedValue(user);
  const userList = [user];
  const userModel = ({
    save: jest.fn().mockResolvedValue(user),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    create: jest.fn(),
    find: jest.fn().mockResolvedValue(userList),
    findById: jest.fn().mockResolvedValue(user)
  } as unknown) as ReturnModelType<typeof UserModel>;

  const service = new UserService(hobbyService, userModel);

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

  describe("addHobbyToUser", () => {
    it("add hobby to user  ", async () => {
      const hobbyPayload = ({ name: "some" } as unknown) as PlainObjectOf<
        HobbyModel
      >;
      await service.addHobbyToUser(user.id, hobbyPayload);
      expect(hobbyService.addHobby).toHaveBeenCalledWith(hobbyPayload);
      expect(user.hobbies.length).toEqual(1);
      expect(user.save).toHaveBeenCalled();
    });
    it("deletes the user by id  ", async () => {
      await service.deleteUserById(user.id);
      expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: user.id });
    });
  });
});
