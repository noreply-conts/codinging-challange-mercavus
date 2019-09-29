import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoose } from "@hasezoey/typegoose";
import { Mongoose } from "mongoose";

export class MongooseConfig {
  private readonly mongoServer = new MongoMemoryServer();
  private readonly DbName = "mercavus";

  public async connect(): Promise<Mongoose> {
    const connectionString = await this.mongoServer.getConnectionString(
      this.DbName
    );
    return await mongoose.connect(connectionString);
  }
}
