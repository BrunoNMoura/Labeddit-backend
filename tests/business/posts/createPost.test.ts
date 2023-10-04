import { PostBusiness } from "../../../src/business/PostBusiness";
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";

describe("Testing createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Creating a post, should return = the sent message", async () => {
    expect.assertions(1);
    const input = {
      token: "token-mock-fulano",
      content: "let's go all in"
    };
    const result = await postBusiness.createPost(input);
    expect(result.content).toEqual("let's go all in");
  });

  test("Creating a post, should return invalid token", async () => {
    expect.assertions(1);
    try {
      const input = {
        token: "token-fail",
        content: "let's go all in"
      };
      const result = await postBusiness.createPost(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("invalid token");
      }
    }
  });
});
