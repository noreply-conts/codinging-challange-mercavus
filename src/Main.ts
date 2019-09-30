import { logger } from "./Logger";
import { Server } from "./Server";
import {
  buildSchema,
  getModelForClass,
  ReturnModelType
} from "@typegoose/typegoose";
import { UserModel } from "./models/UserModel";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { MongooseConfig } from "./boot/MongooseConfig";
import { ExampleDataConfig } from "./boot/ExampleDataConfig";
import { Types } from "mongoose";
import { HobbyModel } from "./models/HobbyModel";

const { PORT = 3000 } = process.env;

const port = Number(PORT);
if (Number.isNaN(port)) {
  throw new Error("PORT env var is not properly configured.");
}

interface BootstrapReturn {
  server: Server;
  userModel: ReturnModelType<typeof UserModel>;
}
export const bootstrap = async (): Promise<BootstrapReturn> => {
  const mongooseConfig = new MongooseConfig();
  const mongoose = await mongooseConfig.connect();
  const hobbyModel = getModelForClass(HobbyModel, {
    existingMongoose: mongoose
  });
  const userModel = getModelForClass(UserModel, { existingMongoose: mongoose });
  const userService = new UserService(userModel);
  const userController = new UserController(userService);

  if (process.env.WITH_EXAMPLE_DATA !== "false") {
    const exampleData = new ExampleDataConfig();
    await exampleData.create(hobbyModel, userModel);
  }

  const server = new Server(userController, {
    port: 3000,
    host: "localhost"
  });

  await server.start();
  logger.info(`Server running on ${server.info.uri}`);

  return { server, userModel };
};

if (require.main === module) {
  if (process.env.NODE_ENV !== "production") {
    /* tslint:disable-next-line */
    const dotenv = require("dotenv");
    dotenv.config();
  }

  bootstrap().catch(error => {
    logger.error("Error on startup: ", error);
    process.exit(-1);
  });
}
