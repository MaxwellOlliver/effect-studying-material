import { Context, Effect } from "effect";

export interface GithubUser {
  id: string;
  name: string;
}

// A context is basically a token that can be used to access a service or resource
export class GithubService extends Context.Tag("GithubService")<
  GithubService,
  {
    findUser: (username: string) => Effect.Effect<GithubUser, Error>;
  }
>() {}
