import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock";
import { CommentBusiness } from "../../../src/business/CommentBusiness";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("Testing createComment", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("should return 'comment created'", async () => {
    expect.assertions(1); 
    const input = {
      postId: "id-mock-post1",
      token: "token-mock-fulano",
      content: "comment mock",
    };
    const result = await commentBusiness.createComment(input);
    expect(result).toEqual("comment created");
  });

  test("should return 'invalid token'", async () => {
    expect.assertions(1); 
    try {
      const input = {
        postId: "id-mock-post1",
        token: "token-fail",
        content: "comment mock",
      };
      await commentBusiness.createComment(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toEqual("invalid token");
      }
    }
  });

  test("should return 'Post not found'", async () => {
    expect.assertions(1);
    try {
      const input = {
        postId: "id-notFound",
        token: "token-mock-astrodev",
        content: "comment mock",
      };
      await commentBusiness.createComment(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("Post not found");
      }
    }
  });
});
