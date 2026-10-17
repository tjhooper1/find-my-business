import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description: `How ${SITE_NAME} makes money and how we choose the resources we recommend.`,
};

export default function DisclosurePage() {
  return (
    <>
      <h1>Affiliate disclosure</h1>
      <p>
        {SITE_NAME} is free to use. To keep it that way, some links to tools, courses and services are affiliate
        links. If you click one and buy something, we may earn a commission. You don&apos;t pay anything extra.
      </p>

      <h2>Your matches are never for sale</h2>
      <p>
        The quiz scores businesses using only your answers. Which partners we work with, and what they pay, play
        no part in your founder type or your matches. Resources are added to a business page only after the
        matching is done.
      </p>

      <h2>How we choose resources</h2>
      <ul>
        <li>We list things we&apos;d recommend even if they paid us nothing.</li>
        <li>We include free and official options, like government guides, alongside paid tools.</li>
        <li>
          We don&apos;t promote multi-level marketing, crypto or trading schemes, or anything that promises
          guaranteed income.
        </li>
        <li>We mark free options, and label affiliate links on business pages.</li>
      </ul>

      <h2>Display ads</h2>
      <p>
        We may show ads in the future. Advertisers won&apos;t influence your results, and we&apos;ll update this
        page and our <Link href="/privacy">privacy policy</Link> before we do.
      </p>

      <h2>Questions</h2>
      <p>Contact us at {CONTACT_EMAIL}.</p>
    </>
  );
}
