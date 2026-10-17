import type { Metadata } from "next";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: "The quiz",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <Quiz />
    </div>
  );
}
