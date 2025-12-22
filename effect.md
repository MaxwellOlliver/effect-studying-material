### The Effect Type

Basically, the Effect type is a description of a operation that can be lazily executed.
You create an Effect, but it doesn't execute immediately. Instead, you can run it later using the `run` options like `runPromise` or `runSync`, we'll discuss them in detail on the **Effect Runtime System** section.

As mentioned on the official documentation, the general structure of an Effect is as follows:

```
┌─── Represents the success type
│        ┌─── Represents the error type
│        │      ┌─── Represents required dependencies
▼        ▼      ▼
Effect<Success, Error, Requirements>
```

This type indicates that an effect:

- Succeeds and returns a value of type Success
- Fails with an error of type Error
- May need certain contextual dependencies of type Requirements to execute

Here's how it looks in TypeScript:

```typescript
type Effect<Success, Error, Requirements> = (
  context: Context<Requirements>,
) => Error | Success;
```

The point is that effects are not functions. They can model synchronous, asynchronous, concurrent and resourceful computations.
