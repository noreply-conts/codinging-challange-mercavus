import { Request, Server } from "@hapi/hapi";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";
import * as _ from "lodash";

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
      throw new Error("Not found ");
    }
    return this.toView(user);
  };

  private toView = (user: UserModel): UserView => {
    return _.pick(user, ["name", "id"]);
  };
}
