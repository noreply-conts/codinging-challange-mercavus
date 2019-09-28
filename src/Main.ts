import { logger } from "./Logger";

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
  logger.info("Startup complete");
};

bootServer().catch(error => {
  logger.error("Error on startup: " + JSON.stringify(error));
  process.exit(-1);
});
