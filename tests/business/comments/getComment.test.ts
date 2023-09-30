import { CommentBusiness } from "../../../src/business/CommentBusiness";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";

describe("Testing getComments", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("should return = 2 objects", async () => {
    expect.assertions(1);
    const input = {
      postId: "id-mock-post1",
      token: "token-mock-fulano"
    }
    const result = await commentBusiness.getComment(input);
    expect(result).toHaveLength(2)
  })

  test("should return = invalid token", async () => {
    expect.assertions(1);
    try {
      const input = {
        postId: "id-mock-post1",
        token: "token-fail"
      }
      const result = await commentBusiness.getComment(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("Invalid token");
      }
    }
  })

  test("should return an empty array = []", async () => {
    expect.assertions(1)
    const input = {
      postId: "id-fail",
      token: "token-mock-fulano"
    }
    const result = await commentBusiness.getComment(input);
    expect(result).toEqual([]);
  })  
})
