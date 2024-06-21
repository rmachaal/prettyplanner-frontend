import Form from "@/components/form";
import { Suspense } from "react";
import Planner from "./planner";
import PhotoBooth from "@/components/photo-booth";
import { CountDisplay, GeneratedCount } from "./generated-count";

export default function FormRSC({
  prompt,
  pattern,
  image,
}: {
  prompt?: string;
  pattern?: string;
  image: string | null;
}) {
  return (
    <div className="z-10 mx-auto w-full max-w-5xl px-2.5 xl:px-0">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        PrettyPlanner
      </h1>
      <h2
        className="text-darkgray-500 mt-6 animate-fade-up text-center opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Let's make planning your day beautiful.
      </h2>
      <p
        className="md:text-l mt-1 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance]"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Powered by{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a>{" "}
        and{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://replicate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Replicate
        </a>
        .
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,2fr] md:gap-1">
        <div>
          <Form promptValue={prompt} patternValue={pattern} />
          <Suspense fallback={<CountDisplay />}>
            <GeneratedCount />
          </Suspense>
          <PhotoBooth image={image} />
        </div>
        <div>
          <Planner />
        </div>
      </div>
    </div>
  );
}
