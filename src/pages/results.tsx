import { trpc } from "../utils/trpc";
import Link from "next/link";

export default function Results() {
  const ratings = trpc.useQuery(["rating.get-ratings"]);
  const deltas = trpc.useQuery(["rating.get-deltas"]);

  return (
    <div className="flex py-20 w-full flex-col bg-gray-50 text-gray-800 items-center justify-start">
      <div className="flex flex-col items-center justify-start w-5/6">
        <h1 className="text-6xl p-2">Results</h1>

        <div className="my-10 w-full md:w-3/4">
          {deltas.data &&
            deltas.data.deltas.map((delta: [string, number]) => (
              <div
                className="flex justify-between items-center gap-20 w-full text-xl border-2 border-sky-500 p-2 rounded-xl"
                key={delta[0]}
              >
                <h3>{delta[0]}</h3>
                <h3
                  className={`${
                    delta[1] > 0
                      ? "text-green-500"
                      : delta[1] === 0
                      ? "text-slate-800"
                      : "text-red-500"
                  } font-bold`}
                >
                  {Math.round(delta[1]*100)/100}
                </h3>
              </div>
            ))}
        </div>

        <button className="bg-sky-500 shadow-xl hover:scale-105 text-white font-bold rounded-[40px]  text-2xl p-4">
          <Link href="/">
            <a className="">
              Back to Voting
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
}
