import { bootstrap } from "../src/Main";
import { addIntegrationFixtures } from "./fixtures";

module.exports = async () => {
  const { server, userModel } = await bootstrap();
  // Set reference to mongod in order to close the server during teardown.
  global.__SERVER__ = server;
  await addIntegrationFixtures(userModel);
};
