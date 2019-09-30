import { Request, Server } from "@hapi/hapi";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";
import * as _ from "lodash";
import { HobbyModel } from "../models/HobbyModel";
import { PlainObjectOf } from "../utils/PlainObject";
import * as mongoose from "mongoose";
import { NotFoundHttpError, ValidationHttpError } from "../errors/HttpErrors";

type UserView = Pick<UserModel, "id" | "name">;

export class UserController {
  constructor(private readonly userService: UserService) {}
  public list = async (req: Request): Promise<UserView[]> => {
    const users = await this.userService.getUsers();
    return users.map(this.toView);
  };

  public getById = async (req: Request): Promise<UserView> => {
    const id = req.params.id;
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundHttpError("Not found");
    }
    return this.toView(user);
  };

  public getHobbiesById = async (req: Request): Promise<HobbyModel[]> => {
    const id = req.params.id;
    return await this.userService.getUserHobbiesById(id);
  };

  public add = async (req: Request): Promise<UserView> => {
    const body = req.payload as PlainObjectOf<Omit<UserModel, "hobbies">>;
    let newUser: UserModel;

    try {
      newUser = await this.userService.addUser(body);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        throw new ValidationHttpError(e);
      }
      throw e;
    }
    return this.toView(newUser);
  };

  private toView = (user: UserModel): UserView => {
    return _.pick(user, ["name", "id"]);
  };
}
