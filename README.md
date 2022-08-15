# 10but

This website takes the popular trend of "They're a 10 but..." and turns it into a fun online game where you can see what other people think! For those unfamiliar with the trend, the basic idea is that you give someone a characteristic about someone and how attractive they are, and then they give you back what they would rate them out of 10. So for example, if someone is a 5 but they know how to use RedisJSON, then they are easily a 10/10!



<img width="1096" alt="TB1" src="https://user-images.githubusercontent.com/8213365/184719265-0e4711e9-ca90-4fbc-9357-ba17f8a9fc8a.png">
<img width="965" alt="TB3" src="https://user-images.githubusercontent.com/8213365/184719266-2cce8aff-f17c-4d2d-8837-025fdffdadd2.png">
<img width="984" alt="TB2" src="https://user-images.githubusercontent.com/8213365/184719264-f1bb1374-36c1-479e-9b0f-044f1f0adf43.png">




## How it works

It is built using Next.js, which handles routing between the main voting page, the results page, and the "add a new prompt" page. Tailwind CSS is used to build the styling and hover states for the page. tRPC is used as a type-safe layer between my TypeScript backend and my TypeScript frontend. And of course, Redis is used as my primary database.

I use Redis for two primary purposes. 

The first is as a store for all of the prompts. I use a Redis list with the keyword "prompts" to store all of this information. If it currently has nothing in it, I add some great default prompts that I found on TikTok and twitter. If a user adds a new prompt, it will be "lpush"ed onto the list, and whenever a user is on the voting page a random prompt is grabbed from the full list.

The second use is as a store for all of the ratings. Whenever a user submits a vote, it saves the prompt, appearance rating, user-given rating, and difference between the two ratings into RedisJSON. I then can get the ratings and perform some data modifications to get an averaged change from appearance rating to user-given rating based on the prompt. This information is displayed on the results page.


### How the data is stored:

For each prompt
* A list of strings using the keyword "prompts"
* Data is appended to the string using the LPUSH command (```LPUSH prompts element```)
* Data is initialized by spreading out a list of default prompts into the LPUSH command (```LPUSH prompts element1 element2 ...```)

For each rating
* A list of JSON objects using the keyword "ratings"
* Each object consists of
  * prompt: A string prompt for this given rating
  * initialRating: A number that is the initial or appearance rating for this prompt
  * rating: A number that is the user-given rating
  * delta: A number that is the rating - initialRating
* The ratings keyword is intialized using a JSON.SET of a [] (```JSON.SET ratings $ []```)
* New ratings are added using the ARRAPPEND command (```JSON.ARRAPPEND ratings & newRating```)
 

### How the data is accessed:

Note that while I show the Redis CLI version of the commands, I used [ioredis](https://github.com/luin/ioredis) for my application. 

For the prompts
* The entire list of prompts is queried using the LRANGE command (```LRANGE prompts 0 -1```)

For the ratings
* The list of ratings is queried using the JSON.GET command (```JSON.GET ratings $```)

Refer to [this example](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs#how-the-data-is-accessed) for a more detailed example of what you need for this section.

## How to run it locally?

1. Clone the repo
```git clone https://github.com/jordantwells42/10but```

2. cd into the directory and npm install
```cd 10but```
```npm install```

3. Create a .env file in the local directory, and create an environment variable called REDIS_URL
```REDIS_URL=redis://:[password]@[Redis URL]:[Redis port]```

4. Start the dev environment by running the following command
```npm run dev```

5. Navigate to localhost:3000, and enjoy the app!

### Prerequisites

Node v16.15.1

### Local installation

Follow local run instructions above

## Deployment

Deployed to [10but.jordantwells.com](https://10but.jordantwells.com) using Vercel

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
