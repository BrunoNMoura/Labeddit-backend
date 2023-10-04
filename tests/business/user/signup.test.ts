import { UserBusiness } from "../../../src/business/UserBusiness";
import { HashManagerMock } from "../../mocks/HashManager.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock";
import { ZodError } from "zod";
import {
  SignupInputDTO,
  SignupSchema,
} from "../../../src/dtos/users/signup.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";

describe("Signup Test", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),    
    new TokenManagerMock(),
    new HashManagerMock(),
  );

  test("should generate a token when signing up", async () => {
    const input = SignupSchema.parse({
      name: "Ciclana",
      email: "ciclana@email.com",
      password: "Ciclana321@",
    });
    const output = await userBusiness.signUp(input);
    expect(output).toEqual({
        message: "Registration done successfully",
        token: "token-mock",
    });
  });

  test("Zod should throw an error for 'name'", () => {
    expect.assertions(1);
    try {
      const input = SignupSchema.parse({
        name: "C",
        email: "Beltrano@email.com",
        password: "Beltrano321@",
      });
      userBusiness.signUp(input);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe(
          "String must contain at least 3 character(s)"
        );
      }
    }
  });

  test("should throw an error for 'email'", () => {
    expect.assertions(1);
    try {
      const input = SignupSchema.parse({
        name: "Ciclana",
        email: "ciclana",
        password: "Ciclana321@",
      });
      userBusiness.signUp(input);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("Invalid email");
      }
    }
  });

  test("should throw an error for 'password'",async () => {
    expect.assertions(1);
    try {
      const input: SignupInputDTO = {
        name: "Ciclana",
        email: "Estranho@email.com",
        password: "ci321",
      };

      SignupSchema.parse(input);
      const output = await userBusiness.signUp(input);
    } catch (error) {
      console.log(error);
      
      if (error instanceof BadRequestError) {
        expect(error.message).toBe(
          "'password' must be between 6 and 15 characters, including numbers, lowercase letters, at least one uppercase letter, and one special character"
        );
      }
    }
  });

  test("should return an error if the email is already registered", async () => {
    expect.assertions(1);
    try {
      const input = SignupSchema.parse({
        name: "Fulano",
        email: "fulano@email.com",
        password: "Fulano123@" 
      });

      const output = await userBusiness.signUp(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("'email' already registered");
      }
    }
  });
});

