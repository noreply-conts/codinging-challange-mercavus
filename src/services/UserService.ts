import { UserModel } from "../models/UserModel";
import { ReturnModelType } from "@hasezoey/typegoose";

export class UserService {
  constructor(private readonly userModel: ReturnModelType<typeof UserModel>) {}

  public async getUsers(): Promise<UserModel[]> {
    return this.userModel.find();
  }

  public async getUserById(id: string): Promise<UserModel | null> {
    return this.userModel.findById(id);
  }
}
