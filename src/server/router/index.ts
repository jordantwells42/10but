// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { ratingRouter } from "./rating";
import { promptRouter } from "./prompt";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("rating.", ratingRouter)
  .merge("prompt.", promptRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
