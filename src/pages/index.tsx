import type { NextPage } from "next";
import React, { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { string } from "zod";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [initialRating, setInitialRating] = useState(0);
  const [rating, setRating] = useState(0);

  const router = useRouter();

  const rateMutation = trpc.useMutation(["rating.cast-rating"]);
  const prompt = trpc.useQuery(["prompt.get-random-prompt"]);

  useEffect(() => {
    getRandomRating();
  }, []);

  function handleRatingChange(newRating: number) {
    setRating(newRating);
  }

  function handleRatingHover(newRating: number) {
    if (newRating === undefined) {
      return;
    }
    setRating(newRating);
  }

  function getRandomRating() {
    const randomRating = Math.floor(Math.random() * 10) + 1;
    setInitialRating(randomRating);
    setRating(randomRating);
  }

  function handleRefresh() {
    router.reload();
  }

  function handleSubmit() {
    const out = rateMutation.mutate({
      prompt: prompt?.data?.prompt,
      rating: rating,
      initialRating: initialRating,
      delta: rating - initialRating,
    });
    console.log(out);
    handleRefresh();
  }

  return (
    <>


      <div className="flex py-20 h-screen w-full flex-col bg-gray-50 text-gray-800 items-center justify-center">
        <div className="shadow-xl bg-sky-600 rounded-[40px] text-white p-8 w-3/4  items-center justify-center">
          <h1 className=" font-bold text-center text-4xl">
            They&apos;re {initialRating === 8 ? "an" : "a"} {initialRating},
          </h1>
          <div className="py-3"></div>
          <h1 className="text-center font-bold italic text-4xl">
            but {prompt.data ? prompt?.data?.prompt : "..."}
          </h1>
        </div>
        <div className="py-10"></div>
        <h1 className=" font-bold text-center text-6xl">
          They&apos;re {rating === 8 ? "an" : "a"} {rating}
        </h1>
        <div className="py-5"></div>
        <div className="flex flex-row items-center jutify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            return (
              <div
                key={num}
                className={`${
                  num <= rating ? "text-sky-500" : "text-gray-400"
                }  rounded-[40px] hover:cursor-pointer h-8 md:h-10 lg:h-12 aspect-square  items-center justify-center`}
                onClick={() => handleRatingChange(num)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8   md:h-10 lg:h-12 aspect-square"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="py-5"></div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <button
            onClick={handleSubmit}
            className="bg-sky-500 shadow-xl hover:scale-105 text-white font-bold rounded-[40px]  text-2xl p-4"
          >
            Submit
          </button>
        </div>

        <div className="py-5"></div>
        <div className="w-full flex items-center justify-center gap-5 underline  font-semibold text-2xl">
          <Link href="/new">
            <h3 className="hover:text-sky-500 hover:cursor-pointer">
              Add a new Prompt
            </h3>
          </Link>
          <Link href="/results">
            <h3 className="hover:text-sky-500 hover:cursor-pointer">
              Results
            </h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
