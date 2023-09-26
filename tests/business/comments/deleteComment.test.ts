// import { CommentBusiness } from "../../../src/business/CommentBusiness"
// import { BadRequestError } from "../../../src/errors/BadRequestError"
// import { NotFoundError } from "../../../src/errors/NotFoundError"
// import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
// import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock"
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock"

// describe("Testando deleteComment", () => {
//   const commentBusiness = new CommentBusiness(
//     new CommentDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   )

//   test("deve retornar = ok", async () => {
//     expect.assertions(1)
//     const input = {
//       idToDelete: "id-mock-comment-1",
//       token: "id-mock-fulano"      
//     }
//     const result = await commentBusiness.deleteComment(input);
//     expect(result).toEqual("ok")
//   })

//   test("deve retornar = token inválido", async () => {
//     expect.assertions(1)
//     try {
//       const input = {
//         idToDelete: "id-mock-comment-1",
//         token: "token-fail"
//       };
//       const result = await commentBusiness.deleteComment(input)
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("token inválido")
//       }
//     }
//   })

//   test("deve retornar = 'id' não encontrado", async () => {
//     expect.assertions(1)
//     try {
//       const input = {
//         idToDelete: "id-fail",
//         token: "id-mock-fulano"
//       }
//       const result = await commentBusiness.deleteComment(input)
//     } catch (error) {
//       if (error instanceof NotFoundError) {
//         expect(error.message).toEqual("'id' não encontrado")
//       }
//     }
//   })

//   test("deve retornar = recurso negado", async () => {
//     expect.assertions(1)
//     try {
//       const input = {
//         idToDelete: "id-mock-comment-2",
//         token: "id-mock-fulano"
//       };
//       const result = await commentBusiness.deleteComment(input)
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         expect(error.message).toEqual("recurso negado")
//       }
//     }
//   })
// })