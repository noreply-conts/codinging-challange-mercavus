import { prop, modelOptions, arrayProp, Ref } from "@typegoose/typegoose";
import * as _ from "lodash";
import { HobbyModel } from "./HobbyModel";
import { v4 as uuidv4 } from "uuid";
import * as mongoose from "mongoose";
import { getName } from "@typegoose/typegoose/lib/internal/utils";
@modelOptions({
  schemaOptions: {
    collection: "users"
  }
})
export class UserModel {
  @prop({ maxlength: 255, minlength: 3 })
  public name: string;

  public get id(): string {
    return _.get(this, "_doc._id");
  }
  public set id(id) {
    this._id = id;
  }

  @arrayProp({
    // FIXME: getName should not be necessary its a
    // bug in typegoose, see: https://github.com/typegoose/typegoose/pull/53
    itemsRef: getName(HobbyModel),
    itemsRefType: mongoose.Schema.Types.String
  })
  public hobbies: Array<Ref<HobbyModel, string>>;

  @prop({ _id: true, default: uuidv4 })
  private _id: string;
}
