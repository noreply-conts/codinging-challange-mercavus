import { prop, modelOptions } from "@hasezoey/typegoose";
import * as _ from "lodash";
import { PassionLevel } from "../constants/PassionLevel";
import { v4 as uuidv4 } from "uuid";
@modelOptions({
  schemaOptions: {
    collection: "hobbies"
  }
})
export class HobbyModel {
  @prop({ maxlength: 255, minlength: 3 })
  public name: string;

  @prop({ enum: PassionLevel })
  public passionLevel: PassionLevel;

  @prop()
  public since: Date;

  public get id(): string {
    return _.get(this, "_doc._id");
  }
  public set id(id) {
    this._id = id;
  }

  @prop({ _id: true, default: uuidv4 })
  public _id: string;
}
