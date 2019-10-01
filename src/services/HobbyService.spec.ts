import { HobbyModel } from "../models/HobbyModel";
import { HobbyService } from "./HobbyService";
import { ReturnModelType } from "@typegoose/typegoose";
import { PlainObjectOf } from "../utils/PlainObject";
import { DeepPartial } from "../utils/DeepPartial";

describe("HobbyModel", () => {
  const model: ReturnModelType<typeof HobbyModel> = ({
    create: jest.fn()
  } as unknown) as ReturnModelType<typeof HobbyModel>;

  const service = new HobbyService(model);
  describe("addHobby", () => {
    it("adds hobby to database", async () => {
      const plain = { name: "some" } as DeepPartial<PlainObjectOf<HobbyModel>>;
      await service.addHobby(plain);
      expect(model.create).toHaveBeenCalledWith(plain);
    });
  });
  describe("deleteHobby", () => {
    it("deletes hobby to database", async () => {
      const plain = { name: "some" } as DeepPartial<PlainObjectOf<HobbyModel>>;
      await service.addHobby(plain);
      expect(model.create).toHaveBeenCalledWith(plain);
    });
  });
});
