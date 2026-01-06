import { Effect, Option } from "effect";

// Option data type represents two values: a some value and a none value.
// It is used to represent a result that may or may not be present.

const someValue = Option.some("Some value");
const noneValue = Option.none();

console.log(someValue);
console.log(noneValue);

const program = Effect.gen(function* () {
  Option.match(someValue, {
    onSome: (value) => {
      console.log("Some value:", value);
    },
    onNone: () => {
      console.log("None value");
    },
  });
});

Effect.runSync(program);
