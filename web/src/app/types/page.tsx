import type { Metadata } from "next";
import Link from "next/link";
import { ARCHETYPES } from "find-my-business-engine";
import { ArchetypeGrid } from "@/components/archetype-grid";

export const metadata: Metadata = {
  title: "The 12 founder types",
  description: `Tinkerer, Dealmaker, Caretaker and more: the ${ARCHETYPES.length} founder types, what each is great at, where they trip up and which businesses fit them best.`,
};

export default function TypesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">The {ARCHETYPES.length} founder types</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Every founder has a natural style. Yours shapes which businesses will feel energizing and which will
        wear you down. Pick a type to see its strengths, blind spots and best-fit businesses.
      </p>
      <div className="mt-8">
        <ArchetypeGrid />
      </div>
      <p className="mt-8 text-muted">
        Not sure which one you are?{" "}
        <Link href="/quiz" className="font-semibold text-ink underline">
          Take the free quiz
        </Link>{" "}
        and find out in about 10 minutes.
      </p>
    </div>
  );
}
