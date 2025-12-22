import { Effect } from "effect";

const main = Effect.log("Hello, World!");

Effect.runPromise(main);
