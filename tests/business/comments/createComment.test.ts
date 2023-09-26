// import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
// import { TokenManagerMock } from "../../mocks/TokenManager.Mock"
// import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock"
// import { CommentBusiness } from "../../../src/business/CommentBusiness"
// import { BadRequestError } from "../../../src/errors/BadRequestError"
// import { NotFoundError } from "../../../src/errors/NotFoundError"

// describe("Testando createComment", () => {
//   const commentBusiness = new CommentBusiness(
//     new CommentDataBaseMock(),
//     new IdGeneratorMock(),
//     new TokenManagerMock()
//   )

//   test("deve retornar = ok", async () => {
//     expect.assertions(1);
//     const input = {
//       postId: "id-mock-post1",
//       token: "id-mock-fulano",
//       content: "ok"
//     };
//     const result = await commentBusiness.createComment(input);
//     expect(result).toEqual("ok");
//   });

//   test("deve retornar = token inválido", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         postId: "id-mock-post1",
//         token: "token-fail",
//         content: "ok"
//       };
//       const result = await commentBusiness.createComment(input);
//     } catch (error) {
//       if ( error instanceof BadRequestError){
//         expect(error.message).toEqual("token inválido");        
//       }
//     }
//   });

//   test("deve retornar = post não encontrado", async () => {
//     expect.assertions(1);
//     try {
//       const input = {
//         postId: "id-mock-post-notFound",
//         token: "id-mock-fulano",
//         content: "ok"
//       };
//       const result = await commentBusiness.createComment(input);
//     } catch (error) {
//       console.log(error)
//       if ( error instanceof NotFoundError){
//         expect(error.message).toEqual("post não encontrado");        
//       }
//     }
//   });
// }) 