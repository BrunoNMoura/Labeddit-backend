import { CommentBusiness } from "../../../src/business/CommentBusiness";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";

describe("Testing editComment", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("should return 'update made'", async () => {
    expect.assertions(1)
    const input = {
      content: "comment mock",
      token: "token-mock-fulano",
      idToEdit: "id-mock-comment-1"
    }
    const result = await commentBusiness.updateComment(input)
    expect(result).toEqual("update made")
  })

  test("should return 'invalid token'", async () => {
    expect.assertions(1);
    try {
      const input = {
        content: "comment mock",
        token: "token-fail",
        idToEdit: "id-mock-comment-1"
      }
      await commentBusiness.updateComment(input)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("invalid token")
      }
    }
  })

  test("should return 'Access denied'", async () => {
    expect.assertions(1);
    try {
      const input = {
        content: "comment mock",
        token: "token-mock-astrodev",
        idToEdit: "id-mock-comment-1"
      }
      const result = await commentBusiness.updateComment(input)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("Access denied")
      }
    }
  })

  test("should return 'id' not found", async () => {
    expect.assertions(1)
    try {
      const input = {
        content: "comment mock",
        token: "token-mock-fulano",
        idToEdit: "id-fail"
      }
      await commentBusiness.updateComment(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'id' not found")
      }
    }
  })
})
