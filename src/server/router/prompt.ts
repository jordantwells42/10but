import { createRouter } from "./context";
import { z } from "zod";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string)
console.log(redis)

export const promptRouter = createRouter().query("hello", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const res = redis.set("lmao", "nice")

    return {

      greeting: `Prompt ${input?.text ?? "world"}`,
    };
  },
}).query("goodbye", {async resolve({}){
    const word = await redis.get("lmao")
    return {
        farewell: word,
    };
}});
