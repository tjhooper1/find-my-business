import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `What ${SITE_NAME} collects, and what it doesn't.`,
};

// Keep this in sync with what the site actually does. Update it BEFORE adding
// email capture, analytics, ads or any new tracking.
export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p>
        The short version: your quiz answers stay in your browser, we don&apos;t sell personal information, and
        we collect as little as we can.
      </p>

      <h2>Your quiz answers</h2>
      <p>
        Your answers, results and skills are saved in your browser&apos;s local storage so you can pause and come
        back. They are not sent to our servers. You can delete them by retaking the quiz or by clearing this
        site&apos;s data in your browser settings.
      </p>

      <h2>Information collected automatically</h2>
      <ul>
        <li>
          <strong>Hosting logs.</strong> Our hosting provider, Vercel, processes standard request information (such
          as IP address, browser type and the pages requested) to deliver the site and keep it secure.
        </li>
        <li>
          <strong>Outbound link clicks.</strong> When you click a resource link, we record which resource, which
          of our pages you clicked from and when. We don&apos;t link this to your identity.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We don&apos;t currently set cookies. When you follow a link to another site, including affiliate partners,
        that site may set its own cookies, for example to credit us with a referral. Their privacy policies apply
        there. See our <Link href="/disclosure">affiliate disclosure</Link>.
      </p>

      <h2>Email</h2>
      <p>
        We don&apos;t collect email addresses yet. If we add that, we&apos;ll update this policy first, ask for
        your consent, and include an unsubscribe link in every email.
      </p>

      <h2>Sharing and selling</h2>
      <p>
        We don&apos;t sell or rent personal information, and we don&apos;t share it for targeted advertising. We
        may disclose information if required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example, California), you may have the right to know what personal
        information we hold about you, to ask us to delete it, and to opt out of its sale or sharing. We don&apos;t
        sell or share it, but you can contact us with any request and we&apos;ll respond within the time required
        by law.
      </p>

      <h2>Children</h2>
      <p>
        {SITE_NAME} is intended for adults and isn&apos;t directed at children under 13. We don&apos;t knowingly
        collect information from children.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We&apos;ll post any changes on this page and update the date below. Questions? Contact us at{" "}
        {CONTACT_EMAIL}.
      </p>
    </>
  );
}
