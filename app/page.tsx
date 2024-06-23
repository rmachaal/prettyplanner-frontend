import Planner from "@/components/planner";

export default function Home() {
  return (
    <div className="z-10 mx-auto w-full max-w-5xl px-2.5 xl:px-0">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        PrettyPlanner
      </h1>
      <h2
        className="text-darkgray-500 mt-2 animate-fade-up text-center opacity-0 [text-wrap:balance] md:text-2xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Let's make planning your day beautiful.
      </h2>
      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,2fr] md:gap-1"> */}
      <div>
        <Planner />
      </div>
      {/* </div> */}
    </div>
  );
}
