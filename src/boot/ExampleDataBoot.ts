import { ReturnModelType } from "@typegoose/typegoose";
import { UserModel } from "../models/UserModel";
import { Schema, Types } from "mongoose";
import { HobbyModel } from "../models/HobbyModel";
import * as _ from "lodash";
import uuid = require("uuid");
import { PassionLevel } from "../constants/PassionLevel";

export class ExampleDataBoot {
  private users: Array<DeepPartial<UserModel>> = [
    {
      name: "John",
      hobbies: [
        {
          _id: uuid.v4(),
          name: "some"
        },
        {
          _id: uuid.v4(),
          name: "SomeOther"
        }
      ]
    },
    {
      name: "Peter"
    },
    {
      name: "Marcus"
    }
  ];
  public async create(
    hobbyModel: ReturnModelType<typeof HobbyModel>,
    userModel: ReturnModelType<typeof UserModel>
  ) {
    const hobbies = _.flatten(this.users.map(user => user.hobbies || []));
    await hobbyModel.insertMany(hobbies);
    await userModel.insertMany(this.users);
  }
}
