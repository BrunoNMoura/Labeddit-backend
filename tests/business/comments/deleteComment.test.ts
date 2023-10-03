import { CommentBusiness } from "../../../src/business/CommentBusiness";
import { ForbiddenError } from "../../../src/errors/ForbiddenError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { CommentDataBaseMock } from "../../mocks/CommentDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";

describe("Testing deleteComment", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("should return 'comment deleted'", async () => {
    expect.assertions(1);
    const input = {
      idToDelete: "id-mock-comment-1",
      token: "token-mock-fulano",
    };
    const result = await commentBusiness.deleteComment(input);
    expect(result).toEqual("comment deleted");
  });

  test("should return 'invalid token'", async () => {
    expect.assertions(1);
    try {
      const input = {
        idToDelete: "id-mock-comment-1",
        token: "token-fail",
      };
      await commentBusiness.deleteComment(input);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        expect(error.message).toEqual("Valid token but not enough permissions");
      }
    }
  });

  test("should return 'comment with this id does not exist'", async () => {
    expect.assertions(1);
    try {
      const input = {
        idToDelete: "id-fail",
        token: "token-mock-fulano",
      };
      const result = await commentBusiness.deleteComment(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("comment with this id does not exist");
      }
    }
  });

  test("should return 'Access denied'", async () => {
    expect.assertions(1);
    try {
      const input = {
        idToDelete: "id-mock-comment-2",
        token: "token-mock-fulano",
      };
      const result = await commentBusiness.deleteComment(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("Access denied");
      }
    }
  });
});
