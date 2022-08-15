import { createRouter } from "./context";
import { z } from "zod";
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL as string);


export const ratingRouter = createRouter()
  .query("get-ratings", {
    async resolve({}) {
      const ratings = JSON.parse(await redis.call("JSON.GET", "ratings", ".") as string)
      return {
        ratings: ratings
      }
    },
  }).query("get-deltas", {
    async resolve({}) {
      const deltas = new Map()
      const ratings = JSON.parse(await redis.call("JSON.GET", "ratings", ".") as string)
      for (let rating of ratings) {
        if (deltas.has(rating.prompt)) {
          deltas.get(rating.prompt).push(rating.delta)
        } else {
          deltas.set(rating.prompt, [rating.delta])
        }
      }
     
      deltas.forEach((value, key) => {
        deltas.set(key, value.reduce((a: number, b: number) => a + b) / value.length)
      })
      
      const outDeltas: [string, number][] = Array.from(deltas.entries())
      outDeltas.sort((a, b) => b[1] - a[1])

      return {
        deltas: outDeltas
      }
    }
  }).mutation("cast-rating", {
    input: z.object({
      prompt: z.string().nullish(),
      rating: z.number().nullish(),
      initialRating: z.number().nullish(),
      delta: z.number().nullish(),
    }), 
    async resolve({input, ctx}) {
      if (!(await redis.call("JSON.GET", "ratings", "$"))) {
        await redis.call("JSON.SET", "ratings", "$", "[]");
      }
      await redis.call("JSON.ARRAPPEND", "ratings", "$", JSON.stringify(input));
      return {success: true, rating: input.rating}
    }
  })