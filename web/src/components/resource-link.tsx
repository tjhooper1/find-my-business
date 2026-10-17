import type { Resource } from "find-my-business-engine";

/** Outbound link to a resource, routed through /go for tracking and affiliate swaps. */
export function ResourceLink({ resource, className, children }: { resource: Resource; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`/go/${resource.id}`}
      target="_blank"
      rel={resource.affiliate ? "sponsored nofollow noopener" : "nofollow noopener"}
      className={className}
    >
      {children}
    </a>
  );
}
