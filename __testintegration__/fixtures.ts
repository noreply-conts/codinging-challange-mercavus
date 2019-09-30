import { UserModel } from "../src/models/UserModel";
import { ReturnModelType } from "@typegoose/typegoose";
import { HobbyModel } from "../src/models/HobbyModel";
export const fixtures: {
  user1: DeepPartial<UserModel>;
  userToDelete: DeepPartial<UserModel>;
} = {
  user1: {
    id: "yoda_1",
    name: "Master Yoda",
    hobbies: [
      {
        _id: "someId",
        name: "Parkour"
      }
    ]
  },
  userToDelete: {
    id: "userToDelete",
    name: "Master Yoda",
    hobbies: [
      {
        _id: "some",
        name: "Parkour"
      }
    ]
  }
};
export async function addIntegrationFixtures(
  hobbieModel: ReturnModelType<typeof HobbyModel>,
  userModel: ReturnModelType<typeof UserModel>
) {
  await hobbieModel.insertMany(fixtures.user1.hobbies);
  await hobbieModel.insertMany(fixtures.userToDelete.hobbies);
  await userModel.create(fixtures.user1);
  await userModel.create(fixtures.userToDelete);
}
