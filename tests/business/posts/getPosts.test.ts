import { PostBusiness } from "../../../src/business/PostBusiness";
import { PostDataBaseMock } from "../../mocks/PostDataBase.Mock";
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";

describe("Testing getPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("get post, should return 'invalid token'", async () => {
    expect.assertions(1);
    try {
      const input = {
        token: "token-fail",
      };
      const result = await postBusiness.getPost(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("invalid token");
      }
    }
  });

  test("get post, should return 3 objects", async () => {
    expect.assertions(2);
    const input = {
      token: "token-mock-fulano",
    };
    const result = await postBusiness.getPost(input);
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        id: "id-mock-post1",
        content: "mock-post-1",
        likes: 0,
        dislikes: 0,
        comments: 0,
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          name: "Astrodev",
        },
        liked: "like",
      },
      {
        id: "id-mock-post2",
        content: "mock-post-2",
        likes: 0,
        dislikes: 0,
        comments: 0,
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          name: "Astrodev",
        },
        liked: "dislike",
      },
      {
        id: "id-mock-post3",
        content: "mock-post-3",
        likes: 0,
        dislikes: 0,
        comments: 0,
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-fulano",
          name: "Fulano",
        },
        liked: "no",
      },
    ]);
  });
});
