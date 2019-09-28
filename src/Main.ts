import { logger } from "./Logger";
import * as Hapi from "@hapi/hapi";

if (process.env.NODE_ENV !== "production") {
  /* tslint:disable-next-line */
  const dotenv = require("dotenv");
  dotenv.config();
}

const { PORT = 3000 } = process.env;

const port = Number(PORT);
if (Number.isNaN(port)) {
  throw new Error("PORT env var is not properly configured.");
}

const bootServer = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: "localhost"
  });

  await server.start();
  logger.info(`Server running on ${server.info.uri}`);
};

bootServer().catch(error => {
  logger.error("Error on startup: " + JSON.stringify(error));
  process.exit(-1);
});
