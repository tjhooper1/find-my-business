import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, GOVERNING_STATE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `The terms for using ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of use</h1>
      <p>By using {SITE_NAME}, you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>

      <h2>For inspiration, not advice</h2>
      <p>
        {SITE_NAME} helps you reflect on what kind of business might suit you. The quiz, founder types and matches
        are for self-reflection and entertainment. They aren&apos;t a scientific assessment, and nothing on the site
        is professional, financial, legal, tax or career advice. Talk to a qualified professional before making
        decisions about money, licensing or your career.
      </p>

      <h2>Estimates are estimates</h2>
      <p>
        Start-up costs, time to first revenue and other figures are rough, general estimates. They vary widely by
        location, niche, effort and luck. We don&apos;t promise that any business will earn money, and most new
        businesses take longer and cost more than expected.
      </p>

      <h2>Third-party links and products</h2>
      <p>
        We link to tools, courses and services run by other companies, some through affiliate links (see our{" "}
        <Link href="/disclosure">affiliate disclosure</Link>). We don&apos;t control those sites and aren&apos;t
        responsible for their content, products or policies. Any purchase you make is between you and that
        company.
      </p>

      <h2>Using the site</h2>
      <p>
        Please don&apos;t misuse the site. For example, don&apos;t attempt to disrupt it, scrape it at scale, or
        use it for anything unlawful. The site&apos;s content, design and quiz are owned by {SITE_NAME} and may
        not be copied or republished without permission.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind.
        We may change, pause or remove any part of it at any time.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} isn&apos;t liable for any indirect, incidental or
        consequential damages, or for any losses, arising from your use of the site or from decisions you make
        based on it.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of {GOVERNING_STATE}, United States.</p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms and will change the date below when we do. Questions? Contact us at{" "}
        {CONTACT_EMAIL}.
      </p>
    </>
  );
}
