import { Effect } from "effect/index";
import fs from "node:fs";

const program = Effect.try({
  try: () => {
    const file = fs.readFileSync("example.txt", "utf8");
    console.log(file);
  },
  catch: (error) => {
    console.error("Error reading file:", error);
  },
});

Effect.runSync(program);
