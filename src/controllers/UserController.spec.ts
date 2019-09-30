import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { UserModel } from "../models/UserModel";
import { ReturnModelType } from "@typegoose/typegoose";
import { Request } from "@hapi/hapi";
import { mocked } from "ts-jest/utils";
import { HobbyModel } from "../models/HobbyModel";
import * as mongoose from "mongoose";
import { NotFoundHttpError, ValidationHttpError } from "../errors/HttpErrors";

jest.mock("../services/UserService");
describe("UserController", () => {
  const service = new UserService((null as unknown) as ReturnModelType<
    typeof UserModel
  >);
  const controller = new UserController(service);

  const user = ({
    id: "someId"
  } as unknown) as UserModel;

  const hobbies = [
    {
      id: "someId"
    }
  ] as HobbyModel[];

  const userList = [user];
  const req: Request = ({
    payload: {},
    params: {
      id: user.id
    }
  } as unknown) as Request;

  mocked(service.getUserById).mockResolvedValue(user);
  mocked(service.getUserHobbiesById).mockResolvedValue(hobbies);
  mocked(service.addUser).mockResolvedValue(user);
  mocked(service.getUsers).mockResolvedValue(userList);
  beforeEach(() => jest.clearAllMocks());
  describe("getById", () => {
    it("throws not found error", async () => {
      mocked(service.getUserById).mockResolvedValueOnce(null);
      await expect(controller.getById(req)).rejects.toThrowError(
        NotFoundHttpError
      );
    });

    it("returns user", async () => {
      const result = await controller.getById(req);
      expect(result).toEqual(user);
    });

    it("searches by id param", async () => {
      const result = await controller.getById(req);
      expect(service.getUserById).toHaveBeenCalledWith(user.id);
    });

    it("remove all additional values from model", async () => {
      const extendedUser = ({
        ...user,
        someOtherProp: "someValue"
      } as unknown) as UserModel;
      mocked(service.getUserById).mockResolvedValueOnce(extendedUser);
      const result = await controller.getById(req);
      expect(result).not.toContain({ someOtherProp: "someValue" });
    });
  });
  describe("list", () => {
    it("returns list of users", async () => {
      const result = await controller.list(req);
      expect(result).toEqual(userList);
    });
    it("remove all additional values for each item", async () => {
      const extendedUser = ({
        ...user,
        someProp: "someValue"
      } as unknown) as UserModel;
      mocked(service.getUsers).mockResolvedValueOnce([extendedUser]);
      const result = await controller.list(req);
      expect(result).not.toEqual(
        expect.arrayContaining([{ someProp: "someValue" }])
      );
    });
  });
  describe("getHobbiesById", () => {
    it("returns hobbies of users by userId", async () => {
      const result = await controller.getHobbiesById(req);
      expect(result).toEqual(hobbies);
    });
    it("searches hobbies by userId", async () => {
      const result = await controller.getHobbiesById(req);
      expect(service.getUserHobbiesById).toHaveBeenCalledWith(req.params.id);
    });
  });

  describe("addUser", () => {
    it("throws 422 error if validation fails", async () => {
      mocked(service.addUser).mockRejectedValueOnce(
        new mongoose.Error.ValidationError()
      );
      await expect(controller.add(req)).rejects.toThrowError(
        ValidationHttpError
      );
    });
    it("returns new user", async () => {
      const result = await controller.add(req);
      expect(result).toEqual(user);
      expect(service.addUser).toHaveBeenCalledWith(req.payload);
    });
  });
});
