import { UserModel } from "../models/UserModel";
import { ReturnModelType } from "@typegoose/typegoose";
import { HobbyModel } from "../models/HobbyModel";

export class UserService {
  constructor(private readonly userModel: ReturnModelType<typeof UserModel>) {}

  public async getUsers(): Promise<UserModel[]> {
    return this.userModel.find();
  }

  public async getUserById(id: string): Promise<UserModel | null> {
    return this.userModel.findById(id);
  }
  public async getUserHobbiesById(id: string): Promise<HobbyModel[]> {
    const user = await this.userModel
      .findById(id)
      .populate("hobbies")
      .exec();
    if (!user) {
      throw new Error(`Could not find user with id: ${id}`);
    }
    return user.hobbies as HobbyModel[];
  }
}
