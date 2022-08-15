import { createRouter } from './context'
import { z } from 'zod'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL as string)

export const promptRouter = createRouter()
  .query('get-random-prompt', {
    async resolve ({}) {
    //await redis.flushall()
      const len = await redis.llen('prompts')
      if (len == 0) {
        await redis.lpush('prompts', ...myPrompts)
      }
      const prompts = await redis.lrange('prompts', 0, -1)
      console.log({ prompts })
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
      return { prompt: randomPrompt }
    }
  })
  .mutation('add-prompt', {
    input: z.object({
      prompt: z.string()
    }),
    async resolve ({ input, ctx }) {
      await redis.lpush('prompts', input.prompt)
      return { success: true }
    }
  })

let myPrompts = [
  'they use goggles in the pool',
  'they’re actually two fives stacked in a trench coat',
  'they ask you if you’d still love them if they were a worm',
  'they put milk before their cereal',
  'they had unrestricted access to the internet at a young age',
  'they listened to Lana Del Rey as a teen',
  'they cry on their birthday every year',
  'they forgot about their animal crossing island',
  'it’s because of inflation',
  'they audibly gasp whenever they hear a One Direction song playing while out in public',
  'they listen to Phoebe Bridgers at 8 am in the morning',
  'they go to Starbucks everyday',
  'they force teenagers to dig holes in the desert',
  'they hate cheese yet like everything that has cheese in it',
  'they eat dairy even though they are lactose intolerant',
  'their gay awakening was Marceline from Adventure Time',
  'they take two hours to pick music for their Insta story',
  'they are an Aries',
  'they are a Taurus',
  'they are a Gemini',
  'they are a Cancer',
  'they are a Leo',
  'they are a Virgo',
  'they are a Libra',
  'they are a Scorpio',
  'they are a Sagitarrius',
  'they are a Capricorn',
  'they are an Aquarius',
  'they are a Pisces',
  'they only have one pillow on their bed',
  'they still play Fortnite',
  'they play League of Legends every day',
  'they have no social media',
  'they are religious about not using TikTok',
  'they use Instagram Reels instead of TikTok',
  'they are 5’6”',
  'they are obsessed with Minions',
  'they recite the Pledge of Allegiance every morning',
  'they go to church every Sunday',
  'they walk on their toes',
  'they think menstrual pads are applied directly to the skin',
  'they put inspirational quotes as each of their Instagram captions',
  'they carry a gallon of water at all times',
  'they kiss their dad on the lips still',
  'they kiss their mom on the lips still',
  'they pool All the time',
  'they have no ass',
  'their feet smell',
  'they’re bald',
  'they have a nice car',
  'they talk back to their parents',
  'they are nice to kids',
  'they have a dog',
  'they have a cat',
  'they have lizards',
  'they’re a horse person',
  'they smoke',
  'they spit when they talk',
  'they respect women',
  'they are a great dancer',
  'they don’t like to cuddle',
  'they put horror movies on to help them fall asleep at night',
  'they only listen to true crime podcasts',
  'they watch anime',
  'they sleep all day',
  'they respond with “k”',
  'they treat people in the service industry with no respect',
  'they have stuffed animals',
  "they don't wash their rice",
  "they're a doctor",
  'they take pictures holding fish ',
  'they wear a backwards hat',
  'they have your exact sense of humor ',
  'they only wear flip flops ',
  'their apartment is spotless',
  'they have a weirdly long pinky nail',
  'your family loves them',
  'their family loves you',
  'they never tip',
  "they're really quiet around your friends",
  "they're a sound cloud rapper",
  'they are an amazing cook',
  'they bake little treats for you',
  "they send cute snack care packages for you when you're on trips",
  'they call their family every week',
  "they're afraid of airplanes",
  'they play Minecraft with their little brother',
  "they don't watch movies",
  'they only communicate using Snapchat',
  'they still send Snapchat streaks',
  'they always find an excuse to pull their acoustic guitar out at parties',
  'they are in an obscure band',
  'they flex in every mirror they pass ',
  'they trash talk while playing video games',
  'they wear sunscreen every time they go outside',
  'they genuinely like Digimon more than Pokemon',
  "they can't drive",
  'they eat cereal without milk',
  'they only drink Diet Dr. Pepper',
  'they drink Monster energy frequently',
  'they have 1000s of unread emails',
  'they wear jean shorts religiously ',
  'they are way too into Crypto',
  'they keep trying to sell you NFTs',
  'they act like a stock bro',
  'they need to touch grass',
  'they talk over other people',
  'they are secretly an alien'
]
