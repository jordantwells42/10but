import { trpc } from "../utils/trpc";
import { useState } from 'react';
import Link from 'next/link';

export default function New(){
    const addPrompt= trpc.useMutation(["prompt.add-prompt"]);

    const [prompt, setPrompt] = useState("");
    const [success, setSuccess] = useState(false)

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === 'Enter'){
            handleSubmit()
        }
      }

    function handleSubmit(){
        const out = addPrompt.mutate({
            prompt: prompt,
        });
        console.log(out);
        setPrompt("");
        setSuccess(true);
    }
    return (
        <div className="flex py-20 h-screen w-full flex-col bg-gray-50 text-gray-800 items-center justify-start">
            <div className="flex flex-col items-center justify-start w-5/6">
                <h1 className="text-4xl p-2 font-bold">New Prompt</h1>
                <h2 className="text-2xl">They&apos;re a 10, but {prompt || "..."}</h2>
                <div className="my-10 w-full md:w-3/4 flex gap-2 items-center justify-center">
                    <input
                        type="text"
                        value={prompt}
                        placeholder={"they are stinky"}
                        onChange={(e) => (setPrompt(e.target.value), setSuccess(false))}
                        onKeyPress={handleKeyPress}
                        className="border-2 p-2 w-full"
                    />
                    <button className="bg-sky-500 shadow-xl hover:scale-105 text-white h-full rounded-2xl p-2 w-48" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                {success && <h2 className="text-green-500 font-semibold">Successfull added!</h2>}
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