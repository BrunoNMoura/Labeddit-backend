// import { PostBusiness } from "../../../src/business/PostBusiness";
// import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock";
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
// import { BadRequestError } from "../../../src/errors/BadRequestError";
// import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
// import { NotFoundError } from "../../../src/errors/NotFoundError";

// describe("Testing editPost", () => {
//   const postBusiness = new PostBusiness(
//     new PostDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   );

//   test("Edit post, should return 'ok'", async () => {
//     expect.assertions(1);
//     const input = {
//       token: "id-mock-astrodev",
//       content: "let's go all out",
//       idToEdit: "id-mock-post1"
//     };
//     const result = await postBusiness.editPost(input);
//     expect(result).toEqual("ok");
//   });

//   test("Edit post, should return 'invalid token'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "token-fail",
//         content: "let's go all out",
//         idToEdit: "id-mock-post1"
//       };
//       const result = await postBusiness.editPost(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("invalid token");
//       }
//     }
//   });

//   test("Edit post, should return 'access denied'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "id-mock-fulano",
//         content: "let's go all out",
//         idToEdit: "id-mock-post1"
//       };
//       const result = await postBusiness.editPost(input);
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         expect(error.message).toEqual("access denied");
//       }
//     }
//   });

//   test("Edit post, should return 'id not found'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "id-mock-bart",
//         content: "let's go all out",
//         idToEdit: "id-mock-post1"
//       };
//       const result = await postBusiness.editPost(input);
//     } catch (error) {
//       if (error instanceof NotFoundError) {
//         expect(error.message).toEqual("'id' not found");
//       }
//     }
//   });
// });
