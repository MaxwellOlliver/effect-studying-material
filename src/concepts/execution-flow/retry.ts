import { Duration, Effect, Schedule } from "effect/index";

let retries = 0;

const task = Effect.gen(function* () {
  yield* Effect.if(retries < 3, {
    onTrue: () => {
      console.log("Ran at ", new Date().toISOString());
      console.log("Retrying...");
      retries++;
      return Effect.fail("Failed!");
    },
    onFalse: () => {
      console.log("Success!");
      return Effect.succeed("Hello, World!");
    },
  });
});

const program = Effect.retry(task, {
  times: 3,
  schedule: Schedule.exponential(Duration.seconds(1)),
});

Effect.runPromise(program);
