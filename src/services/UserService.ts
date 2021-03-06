import { UserModel } from "../models/UserModel";
import { ReturnModelType } from "@typegoose/typegoose";
import { HobbyModel } from "../models/HobbyModel";
import { PlainObjectOf } from "../utils/PlainObject";
import { NotFoundHttpError } from "../errors/HttpErrors";
import { HobbyService } from "./HobbyService";
import { DeepPartial } from "../utils/DeepPartial";
export class UserService {
  constructor(
    private readonly hobbyService: HobbyService,
    private readonly userModel: ReturnModelType<typeof UserModel>
  ) {}

  public async addUser(
    user: DeepPartial<PlainObjectOf<UserModel>>
  ): Promise<UserModel> {
    return this.userModel.create(user);
  }
  public async getUsers(): Promise<UserModel[]> {
    return this.userModel.find();
  }

  public async getUserById(id: string): Promise<UserModel | null> {
    return this.userModel.findById(id);
  }
  public async deleteUserById(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundHttpError(`Cound not find id ${id}`);
    }
  }
  public async addHobbyToUser(
    userid: string,
    hobbyPayload: DeepPartial<PlainObjectOf<HobbyModel>>
  ): Promise<HobbyModel> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new NotFoundHttpError("Could not find user with id " + userid);
    }
    const hobby = await this.hobbyService.addHobby(hobbyPayload);
    user.hobbies.push(hobby);
    await user.save();
    return hobby;
  }
  public async getUserHobbiesById(id: string): Promise<HobbyModel[]> {
    const user = await this.userModel
      .findById(id)
      .populate("hobbies")
      .exec();
    if (!user) {
      throw new NotFoundHttpError(`Could not find user with id: ${id}`);
    }
    return user.hobbies as HobbyModel[];
  }
}
