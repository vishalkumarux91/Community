import { notFound } from "next/navigation";
import { findTopic } from "@/lib/mock";
import { JourneyView } from "@/components/learn/JourneyView";

export default async function TopicJourneyPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const data = findTopic(topic);
  if (!data) notFound();

  return <JourneyView topic={data} />;
}
