import { UserBusiness } from "../../../src/business/UserBusiness";
import { LoginSchema } from "../../../src/dtos/users/login.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { HashManagerMock } from "../../mocks/HashManager.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock";

describe("Login Test", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("should generate a token when login normal", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123@",
    });
    const output = await userBusiness.login(input);
    expect(output).toEqual({
      message: "Login successful!",
      token: "token-mock-fulano",
    });
  });

  test("should generate a token when login admin", async () => {
    const input = LoginSchema.parse({
      email: "astrodev@email.com",
      password: "astrodev99@",
    });
    const output = await userBusiness.login(input);
    expect(output).toEqual({
      message: "Login successful!",
      token: "token-mock-astrodev",
    });
  });

  test("should return 'Invalid email' message when attempting to login", async () => {
    expect.assertions(1);
    try {
      const input = {
        email: "notFound@email.com",
        password: "Fulano123@",
      };
      const output = await userBusiness.login(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("Invalid email");
      }
    }
  });

  test("should return 'invalid password' message when attempting to login", async () => {
    expect.assertions(1);
    try {
      const input = {
        email: "fulano@email.com",
        password: "fulano321",
      };
      const output = await userBusiness.login(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("invalid password");
      }
    }
  });
});
