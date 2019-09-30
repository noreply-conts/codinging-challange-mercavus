import { ReturnModelType } from "@typegoose/typegoose";
import { HobbyModel } from "../models/HobbyModel";
import { PlainObjectOf } from "../utils/PlainObject";

export class HobbyService {
  constructor(
    private readonly hobbyModel: ReturnModelType<typeof HobbyModel>
  ) {}

  public async addHobby(
    data: DeepPartial<PlainObjectOf<HobbyModel>>
  ): Promise<HobbyModel> {
    return await this.hobbyModel.create(data);
  }
}
