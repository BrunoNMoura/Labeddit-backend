import { PostBusiness } from "../../../src/business/PostBusiness";
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("Testing deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Delete post, should return 'invalid token'", async () => {
    expect.assertions(1);
    try {
      const input = {
        token: "token-fail",
        idToDelete: "id-mock-post1"
      };
      const result = await postBusiness.deletePost(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("invalid token");
      }
    }
  });

  test("Delete post, should return 'Access denied'", async () => {
    expect.assertions(1);
    try {
      const input = {
        token: "token-mock-fulano",
        idToDelete: "id-mock-post1"
      };
      const result = await postBusiness.deletePost(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("Access denied");
      }
    }
  });

  test("Delete post, should return 'post with this id does not exist'", async () => {
    expect.assertions(1);
    try {
      const input = {
        token: "token-mock-astrodev",
        idToDelete: "id-fail"
      };
      const result = await postBusiness.deletePost(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("post with this id does not exist");
      }
    }
  });

  test("Delete post, should return 'deleted'", async () => {
    expect.assertions(1);
    const input = {
      token: "token-mock-astrodev",
      idToDelete: "id-mock-post1"
    };
    const result = await postBusiness.deletePost(input);
    expect(result).toEqual("deleted");
  });
});
