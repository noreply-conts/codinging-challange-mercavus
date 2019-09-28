// tslint:disable-next-line:no-implicit-dependencies
import "nodejs";
import "jest-extended";
import { Server } from "../../src/Server";

declare global {
  namespace NodeJS {
    interface Global {
      __SERVER__: Server;
    }
  }
}
