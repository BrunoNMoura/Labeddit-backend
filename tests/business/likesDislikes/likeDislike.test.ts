// import { LikeDislikeBusiness } from "../../../src/business/LikeDislikeBusiness";
// import { LikesDislikesDataBaseMock } from "../../mocks/LikesDislikesDataBase.Mock";
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
// import { POST_ACTION } from "../../../src/models/Post";
// import { BadRequestError } from "../../../src/errors/BadRequestError";
// import { NotFoundError } from "../../../src/errors/NotFoundError";

// describe("Testing like and dislike", () => {
//   const likeDislikeBusiness = new LikeDislikeBusiness(
//     new LikesDislikesDataBaseMock(),
//     new TokenManagerMock()
//   );

//   test("Non-existent record should return = ok", async () => {
//     expect.assertions(2);
//     const input = {
//       id: "id-mock-post2",
//       like: true,
//       action: POST_ACTION.POST,
//       token: "id-mock-fulano"
//     };
//     let result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//     input.like = false;
//     result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//   });

//   test("Existing record should return = ok", async () => {
//     expect.assertions(2);
//     const input = {
//       id: "id-mock-post1",
//       like: true,
//       action: POST_ACTION.POST,
//       token: "id-mock-fulano"
//     };
//     let result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//     input.like = false;
//     result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//   });

//   test("Existing record should return = ok", async () => {
//     expect.assertions(2);
//     const input = {
//       id: "id-mock-post3",
//       like: true,
//       action: POST_ACTION.POST,
//       token: "id-mock-astrodev"
//     };
//     let result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//     input.like = false;
//     result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//   });

//   test("Existing comment record should return = ok", async () => {
//     expect.assertions(1);
//     const input = {
//       id: "id-mock-comment-1",
//       like: true,
//       action: POST_ACTION.COMMENT,
//       token: "id-mock-astrodev"
//     };
//     // Test the like
//     const result = await likeDislikeBusiness.likeDislike(input);
//     expect(result).toBe("ok");
//   });

//   test("Should return = invalid token", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         id: "id-mock-post1",
//         like: true,
//         action: POST_ACTION.POST,
//         token: "id-token-fail"
//       };
//       const result = await likeDislikeBusiness.likeDislike(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("invalid token");
//       }
//     }
//   });

//   test("Should return = 'id' not found", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         id: "id-mock-post",
//         like: true,
//         action: POST_ACTION.POST,
//         token: "id-mock-fulano"
//       };
//       const result = await likeDislikeBusiness.likeDislike(input);
//     } catch (error) {
//       if (error instanceof NotFoundError) {
//         expect(error.message).toEqual("'id' not found");
//       }
//     }
//   });

//   test("Should return = invalid action", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         id: "id-mock-post1",
//         like: true,
//         action: POST_ACTION.POST,
//         token: "id-mock-astrodev"
//       };
//       const result = await likeDislikeBusiness.likeDislike(input);
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("invalid action");
//       }
//     }
//   });
// });
