import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { UserModel } from "../models/UserModel";
import { ReturnModelType } from "@typegoose/typegoose";
import { Request } from "@hapi/hapi";
import { mocked } from "ts-jest/utils";
import { NotFoundHttpError } from "../errors/NotFoundHttpError";

jest.mock("../services/UserService");
describe("UserController", () => {
  const service = new UserService((null as unknown) as ReturnModelType<
    typeof UserModel
  >);
  const controller = new UserController(service);

  const user = ({
    id: "someId"
  } as unknown) as UserModel;

  const userList = [user];
  const req: Request = ({
    params: {
      id: user.id
    }
  } as unknown) as Request;

  mocked(service.getUserById).mockResolvedValue(user);
  mocked(service.getUsers).mockResolvedValue(userList);
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
});
