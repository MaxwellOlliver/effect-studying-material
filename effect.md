## The Effect Type

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

### `sync`

Creates an Effect that represents a synchronous side-effectful computation.

Important to mention that `Effect.sync` must be used with operations that you are sure will not fail.

```typescript
import { Effect } from "effect";

const log = (message: string) =>
  Effect.sync(() => {
    console.log(message); // side effect
  });

//      ┌─── Effect<void, never, never>
//      ▼
const program = log("Hello, World!");
```

### `try`

Creates an Effect that represents a synchronous side-effectful computation that may fail.

```typescript
import { Effect } from "effect";

const readFile = (path: string) =>
  Effect.try({
    try: () => fs.readFileSync(path, "utf8"),
    catch: (error) => error.message,
  });

//      ┌─── Effect<string, string, never>
//      ▼
const program = readFile("example.txt");
```

### `promise`

Creates an Effect that represents an asynchronous side-effectful computation that is guranteed to succeed.

```typescript
import { Effect } from "effect";

const delay = (message: string) =>
  Effect.promise<string>(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(message);
        }, 2000);
      }),
  );

//      ┌─── Effect<string, never, never>
//      ▼
const program = delay("Async operation completed successfully!");
```

### `tryPromise`

Creates an Effect that represents an asynchronous side-effectful computation that may fail.

```typescript
import { Effect } from "effect";

const fetchUser = (id: string) =>
  Effect.tryPromise({
    try: () => fetch(`https://api.example.com/users/${id}`),
    catch: (error) => error.message,
  });

//      ┌─── Effect<Response, string, never>
//      ▼
const program = fetchUser("123");
```

### `async`

Creates an Effect from that old callback-based asynchronous function pattern.

```typescript
import { Effect } from "effect";
import * as NodeFS from "node:fs";

const readFile = (filename: string) =>
  Effect.async<Buffer, Error>((resume) => {
    NodeFS.readFile(filename, (error, data) => {
      if (error) {
        // Resume with a failed Effect if an error occurs
        resume(Effect.fail(error));
      } else {
        // Resume with a succeeded Effect if successful
        resume(Effect.succeed(data));
      }
    });
  });

//      ┌─── Effect<Buffer, Error, never>
//      ▼
const program = readFile("example.txt");
```

Sadly, typescript cannot infer the type of the callback function's arguments, so you need to provide the type explicitly.
W
