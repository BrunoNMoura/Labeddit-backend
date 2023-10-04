import { LikeDislikeBusiness } from "../../../src/business/LikeDislikeBusiness";
import { LikesDislikesDataBaseMock } from "../../mocks/LikesDislikesDataBase.Mock";
import { TokenManagerMock } from "../../mocks/TokenManager.Mock";
import { POST_ACTION } from "../../../src/models/Post";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { ForbiddenError } from "../../../src/errors/ForbiddenError";

describe("Testing like and dislike", () => {
  const likeDislikeBusiness = new LikeDislikeBusiness(
    new LikesDislikesDataBaseMock(),
    new TokenManagerMock()
  );

  test("Non-existent record should return = ok", async () => {
    expect.assertions(2);
    const input = {
      id: "id-mock-post2",
      like: true,
      action: POST_ACTION.POST,
      token: "token-mock-fulano"
    };
    let result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
    input.like = false;
    result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
  });

  test("Existing record should return = ok", async () => {
    expect.assertions(2);
    const input = {
      id: "id-mock-post1",
      like: true,
      action: POST_ACTION.POST,
      token: "token-mock-fulano"
    };
    let result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
    input.like = false;
    result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
  });

  test("Existing record should return = ok", async () => {
    expect.assertions(2);
    const input = {
      id: "id-mock-post3",
      like: true,
      action: POST_ACTION.POST,
      token: "token-mock-astrodev"
    };
    let result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
    input.like = false;
    result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
  });

  test("Existing comment record should return = ok", async () => {
    expect.assertions(1);
    const input = {
      id: "id-mock-comment-1",
      like: true,
      action: POST_ACTION.COMMENT,
      token: "token-mock-astrodev"
    };
    const result = await likeDislikeBusiness.likeDislike(input);
    expect(result).toBe("ok");
  });

  test("Should return = Invalid token", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-mock-post1",
        like: true,
        action: POST_ACTION.POST,
        token: "token-fail"
      };
      await likeDislikeBusiness.likeDislike(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toEqual("Invalid token");
      }
    }
  });

  test("Should return = 'id' not found", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-fail",
        like: true,
        action: POST_ACTION.POST,
        token: "token-mock-fulano"
      };
      await likeDislikeBusiness.likeDislike(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toEqual("'id' not found");
      }
    }
  });

  test("Should return 'Valid token but not enough permissions'", async () => {
    expect.assertions(1);
    try {
      const input = {
        id: "id-mock-post1",
        like: true,
        action: POST_ACTION.POST,
        token: "token-mock-astrodev"
      };
      const result = await likeDislikeBusiness.likeDislike(input);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        expect(error.message).toEqual("Valid token but not enough permissions");
      }
    }
  });
});
