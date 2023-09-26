import { UserBusiness } from "../../../src/business/UserBusiness";
import { GetUsersSchema } from "../../../src/dtos/users/getUsers.dto";
import { ForbiddenError } from "../../../src/errors/ForbiddenError";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { USER_ROLES } from "../../../src/models/User";
import { HashManagerMock } from "../../mocks/HashManager.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock";

describe("Testing getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("should return a list of users", async () => {
    const input = GetUsersSchema.parse({
      token: "id-mock-astrodev"
    });
    const output = await userBusiness.getUsers(input);
    expect(output).toHaveLength(2);
    expect(output).toContainEqual({
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN
    });
  });

  test("should return a user", async () => {
    const input = GetUsersSchema.parse({
      q: "Astrodev",
      token: "id-mock-astrodev"
    });
    const output = await userBusiness.getUsers(input);
    expect(output).toContainEqual({
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN
    });
  });

  test("should return the message 'only admins can access'", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "id-mock-fulano"
      });
      const output = await userBusiness.getUsers(input);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        expect(error.message).toEqual("Valid token but not enough permissions");
      }
    }
  });

  test("should return the message 'invalid token'", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "token-incorrect"
      });
      const output = await userBusiness.getUsers(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("invalid token");
      }
    }
  });
});
