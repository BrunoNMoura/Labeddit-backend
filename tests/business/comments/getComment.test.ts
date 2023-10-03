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
  
})
describe("Testing checkIfPostExists", () => {
  const commentDataBaseMock = new CommentDataBaseMock();

  test("should return true for existing postId", async () => {
    const existingPostId = "id-mock-post1";
    const result = await commentDataBaseMock.checkIfPostExists(existingPostId);
    expect(result).toBe(true);
  });

  test("should return false for non-existing postId", async () => {
    const nonExistingPostId = "id-non-existent";
    const result = await commentDataBaseMock.checkIfPostExists(nonExistingPostId);
    expect(result).toBe(false);
  });
});

