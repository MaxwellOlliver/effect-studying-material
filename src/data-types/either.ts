import { Effect, Either } from "effect";
import { GithubService } from "../basics/context";
import { GithubServiceLive, GithubServiceMock } from "../basics/layer";

// Either data type represents two values: a right value and a left value.
// It is used to represent a computation that can either succeed with a right value or fail with a left value.

const rightValue = Either.right("Right value");
const leftValue = Either.left("Left value");

const getUser = Effect.gen(function* () {
  const gh = yield* GithubService;

  const userResult = yield* gh.findUser("user123123123").pipe(Effect.either);

  if (Either.isRight(userResult)) {
    return Either.right(userResult.right);
  }

  return Either.left("User not found");
});

Effect.runPromise(
  getUser.pipe(
    Effect.provide(GithubServiceMock),
    Effect.tap((result) => {
      if (Either.isRight(result)) {
        console.log("User found:", result.right);
      }

      if (Either.isLeft(result)) {
        console.log("User not found:", result.left);
      }
    })
  )
);
