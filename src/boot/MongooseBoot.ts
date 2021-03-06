import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoose } from "@typegoose/typegoose";
import { Mongoose } from "mongoose";

export class MongooseBoot {
  private readonly mongoServer = new MongoMemoryServer();
  private readonly DbName = "mercavus";

  public async connect(): Promise<Mongoose> {
    const connectionString = await this.mongoServer.getConnectionString(
      this.DbName
    );
    return await mongoose.connect(connectionString);
  }
}
