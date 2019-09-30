import { bootstrap } from "../src/Main";
import { addIntegrationFixtures } from "./fixtures";

module.exports = async () => {
  // FIXME: Find solution to use .env instead of modify env vars!
  process.env.WITH_EXAMPLE_DATA = "false";
  const { server, userModel, hobbyModel } = await bootstrap();
  // Set reference to mongod in order to close the server during teardown.
  global.__SERVER__ = server;
  await addIntegrationFixtures(hobbyModel, userModel);
};
