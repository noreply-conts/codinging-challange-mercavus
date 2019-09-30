import {
  ServerOptions,
  Server as HapiServer,
  ServerInfo,
  Request
} from "@hapi/hapi";
import { UserController } from "./controllers/UserController";
import * as inert from "@hapi/inert";
import { HttpError } from "./errors/HttpErrors";
import { logger } from "./Logger";

// FIXME: Wrong typings in @types/boom for the current version see:
// https://github.com/outmoded/discuss/issues/608
/*tslint:disable-next-line*/
import * as Boom from "@hapi/boom";
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
    this.initListeners();
    return this.hapi.start();
  }

  public async stop() {
    return this.hapi.stop();
  }

  private initListeners() {
    this.hapi.ext("onPreResponse", this.onError);
  }

  private async registerMiddleware() {
    await this.hapi.register({
      plugin: inert
    });
  }

  private onError = async (request: Request) => {
    const response = request.response as Boom | HttpError & Boom;

    if (response instanceof HttpError) {
      response.output.statusCode = response.statusCode;
      response.output.payload = {
        statusCode: response.statusCode,
        message: response.message,
        error: response.constructor.name,
        attributes: response.attributes
      };
    } else {
      logger.error(response.message, response.stack);
    }
    return response;
  };

  private initControllerRoutes() {
    this.hapi.route({
      method: "GET",
      path: this.ApiPrefix + "/users",
      handler: this.userController.list
    });
    this.hapi.route({
      method: "POST",
      path: this.ApiPrefix + "/users",
      handler: this.userController.add
    });
    this.hapi.route({
      method: "DELETE",
      path: this.ApiPrefix + "/users/{id}",
      handler: this.userController.delete
    });

    this.hapi.route({
      method: "GET",
      path: this.ApiPrefix + "/users/{id}",
      handler: this.userController.getById
    });
    this.hapi.route({
      method: "GET",
      path: this.ApiPrefix + "/users/{id}/hobbies",
      handler: this.userController.getHobbiesById
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
