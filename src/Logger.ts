/* tslint:disable:no-console */
class Logger {
  public debug(msg: string, ...args: any) {
    console.debug(msg, ...args);
  }
  public info(msg: string, ...args: any) {
    console.info(msg, ...args);
  }
  public warn(msg: string, ...args: any) {
    console.warn(msg, ...args);
  }
  public error(msg: string, ...args: any) {
    console.error(msg, ...args);
  }
}

export const logger = new Logger();
