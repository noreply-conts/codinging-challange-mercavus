import { prop, modelOptions } from "@hasezoey/typegoose";
import * as _ from "lodash";
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

  @prop({ _id: true })
  private _id: string;
}
