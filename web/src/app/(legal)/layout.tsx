import { LEGAL_UPDATED } from "@/lib/site";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 leading-relaxed sm:py-14 [&_a]:underline [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
      <p className="text-sm text-muted">Last updated {LEGAL_UPDATED}.</p>
    </article>
  );
}
