import { ZodError } from "zod";
import { UserBusiness } from "../../../src/business/UserBusiness";
import { GetUsersSchema } from "../../../src/dtos/users/getUsers.dto";
import { USER_ROLES } from "../../../src/models/User";
import { HashManagerMock } from "../../mocks/HashManager.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock";
import { BaseError } from "../../../src/errors/BaseError";
import { BadRequestError } from "../../../src/errors/BadRequestError";

describe("Testing getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("should return a list of users", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-astrodev",
    });
    const output = await userBusiness.getUsers(input);
    expect(output).toHaveLength(2);
    expect(output).toEqual([
      {
        id: "id-mock-fulano",
        name: "Fulano",
        email: "fulano@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.NORMAL
      },
      {
        id: "id-mock-astrodev",
        name: "Astrodev",
        email: "astrodev@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.ADMIN
      },
    ]);
  });
  test("token error not reported", async () => {
    expect.assertions(1);
    try {
      const input = GetUsersSchema.parse({
        token: "",
      });
      await userBusiness.getUsers(input);
    } catch (error) {
      expect(error instanceof ZodError).toBe(true);
    }
  });
  test("should return a user", async () => {
    const input = GetUsersSchema.parse({
      q: "Astrodev",
      token: "token-mock-astrodev",
    });
    const output = await userBusiness.getUsers(input);
    expect(output).toContainEqual({
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN,
    });
  });

  test("should return the message 'invalid token'", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "id-mock-fulano",
      });
      await userBusiness.getUsers(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("invalid token");
      }
    }
  });

  test("should return the message 'invalid token'", async () => {
    try {
      const input = GetUsersSchema.parse({
        token: "token-mock-incorrect",
      });
      const output = await userBusiness.getUsers(input);
    } catch (error) {
      expect(error instanceof BaseError).toBe(true);
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("invalid token");
      }
    }
  });
});
