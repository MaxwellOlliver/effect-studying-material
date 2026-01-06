import { Effect, Layer } from "effect";
import { GithubService, GithubUser } from "./context";
import fetch from "node-fetch";

// Layers are used to compose services and resources. It is basically a recipe to
// build services and resources.

export const GithubServiceLive = Layer.succeed(
  GithubService,
  GithubService.of({
    findUser: (username: string) =>
      Effect.tryPromise(async () => {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) throw new Error(`Failed to fetch user: ${username}`);
        const json = await response.json();

        return json as GithubUser;
      }),
  }),
);

export const GithubServiceMock = Layer.succeed(
  GithubService,
  GithubService.of({
    findUser: (username: string) =>
      Effect.fail(new Error(`User not found: ${username}`)),
  }),
);
