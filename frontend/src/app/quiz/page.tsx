import Quiz from "@/components/Quiz";
import { listProducts } from "@/lib/db";

export const metadata = { title: "Skin Quiz – Glowify" };

export default async function QuizPage() {
  return <Quiz products={await listProducts()} />;
}
