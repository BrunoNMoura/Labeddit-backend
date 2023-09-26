// import { CommentBusiness } from "../../../src/business/CommentBusiness"
// import { BadRequestError } from "../../../src/errors/BadRequestError"
// import { NotFoundError } from "../../../src/errors/NotFoundError"
// import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
// import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock"
// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock"

// describe("Testando editComment", () => {
//   const commentBusiness = new CommentBusiness(
//     new CommentDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   )

//   test("deve retornar = ok", async () => {
//     expect.assertions(1)
//     const input = {
//       content: "ok",
//       token: "id-mock-fulano",
//       idToEdit: "id-mock-comment-1"
//     }
//     const result = await commentBusiness.editComment(input)
//     expect(result).toEqual("ok")
//   })

//   test("deve retornar = token inválido", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         content: "ok",
//         token: "token-fail",
//         idToEdit: "id-mock-comment-1"
//       }
//       const result = await commentBusiness.editComment( input)
//     } catch (error) {
//       if (error instanceof BadRequestError) {
//         expect(error.message).toEqual("token inválido")
//       }
//     }
//   })

//   test("deve retornar = recurso negado", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         content: "ok",
//         token: "id-mock-astrodev",
//         idToEdit: "id-mock-comment-1"
//       }
//       const result = await commentBusiness.editComment(input)
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         expect(error.message).toEqual("recurso negado")
//       }
//     }
//   })

//   test("deve retornar = 'id' não encontrado", async () => {
//     expect.assertions(1)
//     try {
//       const input = {
//         content: "ok",
//         token: "id-mock-fulano",
//         idToEdit: "id-fail"
//       }
//       const result = await commentBusiness.editComment(input)
//     } catch (error) {
//       if (error instanceof NotFoundError) {
//         expect(error.message).toEqual("'id' não encontrado")
//       }
//     }
//   })
// })