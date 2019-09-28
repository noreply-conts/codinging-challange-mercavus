import { UserModel } from "../src/models/UserModel";
import { ReturnModelType } from "@hasezoey/typegoose";
export const fixtures: { user1: Partial<UserModel> } = {
  user1: {
    id: "yoda_1",
    name: "Master Yoda"
  }
};
export async function addIntegrationFixtures(
  userMode: ReturnModelType<typeof UserModel>
) {
  await userMode.create(fixtures.user1);
}
