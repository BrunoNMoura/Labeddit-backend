// import { CommentBusiness } from "../../../src/business/CommentBusiness"
// import { BadRequestError } from "../../../src/errors/BadRequestError"
// import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock"
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock"

// describe("Testando getComments", () => {
//   const commentBusiness = new CommentBusiness(
//     new CommentDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   )

//   test("deve retornar = 2 objetos", async () => {
//     expect.assertions(1);
//     const input = {
//       commentId: "id-mock-post1",
//       token: "id-mock-fulano"
//     }
//     const result = await commentBusiness.getComment(input);
//     expect(result).toHaveLength(2)
//   })

//   test("deve retornar = token inválido", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         commentId: "id-mock-post1",
//         token: "token-fail"
//       }
//       const result = await commentBusiness.getComment(input)
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("token inválido");
//       }
//     }
//   })

//   test("deve retornar um array vazio = []", async () => {
//     expect.assertions(1)
//     const input = {
//       commentId: "id-mock-postX",
//       token: "id-mock-fulano"
//     }
//     const result = await commentBusiness.getComment(input);
//     expect(result).toEqual([]);
//   })  
// })