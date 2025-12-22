import { Effect } from "effect/index";

const program = Effect.sync(() => {
  console.log("Hello, world!");
});

Effect.runSync(program);
