import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
// import FormRSC from "@/components/form-rsc";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await kv.hgetall<{ prompt: string; image?: string }>(params.id);
  if (!data) {
    return;
  }

  const title = `PrettyPlanner: ${data.prompt}`;
  const description = `A spiral generated from the prompt: ${data.prompt}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@steventey",
    },
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await kv.hgetall<{
    prompt: string;
    pattern?: string;
    image?: string;
  }>(params.id);

  if (!data) {
    notFound();
  }
  return (
    <div><h1>Hello</h1></div>
  );
}
