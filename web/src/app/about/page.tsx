import type { Metadata } from "next";
import Link from "next/link";
import { ARCHETYPES, BUSINESSES, DIMENSIONS, QUESTIONS } from "find-my-business-engine";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${SITE_NAME} exists, how the quiz matches you to businesses, and how the site makes money.`,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 leading-relaxed sm:py-14 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-3xl font-bold sm:text-4xl">About {SITE_NAME}</h1>
      <p className="text-lg text-muted">
        Most lists of business ideas rank them by how much money they might make. They skip the question that
        decides whether you&apos;ll stick with it: would you actually enjoy the work?
      </p>
      <p>
        {SITE_NAME} starts with you instead. It&apos;s a free quiz about how you like to work, matched against{" "}
        {BUSINESSES.length} businesses, from freelance writing to running a coffee cart. It&apos;s built and run
        independently by one person, not a company selling courses or franchises.
      </p>

      <h2>How the matching works</h2>
      <ul>
        <li>
          The quiz asks {QUESTIONS.length} questions that measure {DIMENSIONS.length} traits, like how much risk
          you enjoy, how much you like being around people and how much routine suits you.
        </li>
        <li>
          Every business has its own trait profile describing what tends to make people thrive at it. A
          bookkeeping business rewards care and structure. A coffee cart rewards energy around people and
          hands-on work.
        </li>
        <li>
          Your answers are compared with each profile, and the closest fits come first, each with plain-language
          reasons. Your answers also place you in one of {ARCHETYPES.length}{" "}
          <Link href="/types">founder types</Link>.
        </li>
        <li>
          Everything runs in your browser. Your answers aren&apos;t sent to us. See the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </li>
      </ul>
      <p>
        The trait profiles are informed judgments, not science. Use your matches as a starting point for
        reflection, not a verdict.
      </p>

      <h2>How business guides are written</h2>
      <p>
        Business guides cover what the work is like day to day, how people land their first customers, how they
        charge and who should skip it. They&apos;re drafted with the help of AI, then checked and edited by hand.
        Rules, licenses and prices vary a lot by location, so guides stay general and point you to the right
        place to check, like your local health department or licensing board.
      </p>
      <p>
        New guides are added over time. Spotted something wrong or out of date? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and it&apos;ll get fixed.
      </p>

      <h2>How the site makes money</h2>
      <p>
        {SITE_NAME} is free. It earns money from clearly labeled ads on some pages and from affiliate links to
        tools and courses. Neither one affects your matches: the quiz scores businesses using only your answers.
        Read the <Link href="/disclosure">affiliate disclosure</Link> for details.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, corrections or a business you think is missing? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </article>
  );
}
