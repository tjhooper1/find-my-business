import type { Metadata } from "next";
import { Results } from "./results";

export const metadata: Metadata = {
  title: "Your matches",
  robots: { index: false },
};

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Results />
    </div>
  );
}
