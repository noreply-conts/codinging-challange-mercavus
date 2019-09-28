import { ServerOptions, Server as HapiServer, ServerInfo } from "@hapi/hapi";
import { UserController } from "./controllers/UserController";
import * as inert from "@hapi/inert";
import { logger } from "./Logger";

export class Server {
  private readonly hapi: HapiServer;

  private readonly ApiPrefix = "/api";

  constructor(
    private readonly userController: UserController,
    options: ServerOptions
  ) {
    this.hapi = new HapiServer(options);
  }

  public get info(): ServerInfo {
    return this.hapi.info;
  }
  public async start() {
    await this.registerMiddleware();
    this.initControllerRoutes();
    this.initPublicRoutes();
    return this.hapi.start();
  }

  public async stop() {
    return this.hapi.stop();
  }

  private async registerMiddleware() {
    await this.hapi.register({
      plugin: inert
    });
  }

  private initControllerRoutes() {
    this.hapi.route({
      method: "GET",
      path: this.ApiPrefix + "/users",
      handler: this.userController.list
    });

    this.hapi.route({
      method: "GET",
      path: this.ApiPrefix + "/users/{id}",
      handler: () => this.userController.getById
    });
  }
  private initPublicRoutes() {
    this.hapi.route({
      method: "GET",
      path: "/{file*}",
      handler: {
        directory: {
          path: "public/"
        }
      }
    });
  }
}
