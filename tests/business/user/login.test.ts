// import { UserBusiness } from "../../../src/business/UserBusiness";
// import { LoginSchema } from "../../../src/dtos/users/login.dto";
// import { BadRequestError } from "../../../src/errors/BadRequestError";
// import { HashManagerMock } from "../../mocks/HashManager.Mock";
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
// import { UserDataBaseMock } from "../../mocks/UserDataBase.Mock";

// describe("Login Test", () => {
//   const userBusiness = new UserBusiness(
//     new UserDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock(),
//     new HashManagerMock()
//   );

//   test("should generate a token when logging in", async () => {
//     const input = LoginSchema.parse({
//       email: "fulano@email.com",
//       password: "Fulano123@"
//     });
//     const output = await userBusiness.login(input);
//     expect(output).toEqual({
//       user: {
//         userId: "id-mock-fulano",
//         userName: "Fulano"
//       },
//       token: "token-mock-fulano"
//     });
//   });

//   test("should generate a token when logging in", async () => {
//     const input = LoginSchema.parse({
//       email: "astrodev@email.com",
//       password: "astrodev99@"
//     });
//     const output = await userBusiness.login(input);
//     expect(output).toEqual({
//       user: {
//         userId: "id-mock-astrodev",
//         userName: "Astrodev"
//       },
//       token: "token-mock-astrodev"
//     });
//   });

//   test("should return 'email not found' message when attempting to log in", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         email: "notFound@email.com",
//         password: "Fulano123@"
//       };
//       const output = await userBusiness.login(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("'email' not found");
//       }
//     }
//   });

//   test("should return 'incorrect password' message when attempting to log in", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         email: "fulano@email.com",
//         password: "fulano321"
//       };
//       const output = await userBusiness.login(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("'password' incorrect");
//       }
//     }
//   });
// });
