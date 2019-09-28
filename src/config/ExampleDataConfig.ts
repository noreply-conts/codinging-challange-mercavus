import { ReturnModelType } from "@hasezoey/typegoose";
import { UserModel } from "../models/UserModel";

export class ExampleDataConfig {
  private users: Array<Partial<UserModel>> = [
    {
      name: "John"
    },
    {
      name: "Peter"
    },
    {
      name: "Marcus"
    }
  ];
  public async create(userModel: ReturnModelType<typeof UserModel>) {
    await userModel.insertMany(this.users);
  }
}
