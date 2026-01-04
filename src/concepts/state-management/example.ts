import { Effect, Context, Ref, Layer } from "effect";

type EffectStateShape = {
  readonly counter: Ref.Ref<number>;
};

const EffectState = Context.Tag("EffectState")<
  "EffectState",
  EffectStateShape
>();

const EffectStateLive = Layer.effect(
  EffectState,
  Ref.make<number>(0).pipe(Effect.map((c) => ({ counter: c }))),
);

const incrementCounter = Effect.gen(function* () {
  const state = yield* EffectState;

  yield* Ref.update(state.counter, (n) => n + 1);
});

const decrementCounter = Effect.gen(function* () {
  const state = yield* EffectState;

  yield* Ref.update(state.counter, (n) => n - 1);
});

const program1 = Effect.gen(function* () {
  const state = yield* EffectState;

  yield* incrementCounter;
  yield* incrementCounter;
  yield* decrementCounter;

  yield* Effect.log(
    `Counter value in program 1: ${yield* Ref.get(state.counter)}`,
  );
});

const program2 = Effect.gen(function* () {
  const state = yield* EffectState;

  yield* incrementCounter;
  yield* incrementCounter;

  yield* Effect.log(
    `Counter value in program 2: ${yield* Ref.get(state.counter)}`,
  );
});

Effect.runSync(program1.pipe(Effect.provide(EffectStateLive)));
Effect.runSync(program2.pipe(Effect.provide(EffectStateLive)));
