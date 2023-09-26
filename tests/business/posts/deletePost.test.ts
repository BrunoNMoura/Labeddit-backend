// import { PostBusiness } from "../../../src/business/PostBusiness";
// import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock";
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
// import { BadRequestError } from "../../../src/errors/BadRequestError";
// import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";

// describe("Testing deletePost", () => {
//   const postBusiness = new PostBusiness(
//     new PostDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   );

//   test("Delete post, should return 'invalid token'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "token-fail",
//         idToDelete: "id-mock-post1"
//       };
//       const result = await postBusiness.deletePost(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("invalid token");
//       }
//     }
//   });

//   test("Delete post, should return 'unauthorized'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "id-mock-fulano",
//         idToDelete: "id-mock-post1"
//       };
//       const result = await postBusiness.deletePost(input);
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         expect(error.message).toEqual("unauthorized");
//       }
//     }
//   });

//   test("Delete post, should return 'id not found'", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         token: "id-mock-astrodev",
//         idToDelete: "id-fail"
//       };
//       const result = await postBusiness.deletePost(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("'id' not found");
//       }
//     }
//   });

//   test("Delete post, should return 'ok'", async () => {
//     expect.assertions(1);
//     const input = {
//       token: "id-mock-astrodev",
//       idToDelete: "id-mock-post1"
//     };
//     const result = await postBusiness.deletePost(input);
//     expect(result).toEqual("ok");
//   });
// });
