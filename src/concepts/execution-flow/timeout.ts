import { Duration, Effect } from "effect/index";

const task = Effect.gen(function* () {
  console.log("Start processing...");
  yield* Effect.sleep(Duration.seconds(2));
  console.log("Processing complete.");
  return "Result";
});

const program = task.pipe(
  Effect.timeout(Duration.seconds(1)),
  Effect.catchTags({
    TimeoutException: (error) => {
      console.log("Timeout occurred:", error.message);
      return Effect.succeed("Timeout");
    },
  })
);

Effect.runPromise(program);
