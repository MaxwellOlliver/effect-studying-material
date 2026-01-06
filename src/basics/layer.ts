import { Effect, Layer } from "effect";
import { GithubService } from "./context";

// Layers are used to compose services and resources. It is basically a recipe to
// build services and resources.

export const GithubServiceLive = Layer.succeed(
  GithubService,
  GithubService.of({
    findUser: (username: string) =>
      Effect.succeed({ id: "1", name: "John Doe" }),
  }),
);
