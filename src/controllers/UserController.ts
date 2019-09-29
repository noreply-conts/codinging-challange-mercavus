import { Request, Server } from "@hapi/hapi";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";
import * as _ from "lodash";
import { NotFoundHttpError } from "../errors/NotFoundHttpError";
import { HobbyModel } from "../models/HobbyModel";

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

  private toView = (user: UserModel): UserView => {
    return _.pick(user, ["name", "id"]);
  };
}
