import type { NextRequest } from "next/server";
import { resourceById } from "find-my-business-engine";

// Every outbound resource link goes through here, so a link can become an
// affiliate link by changing one URL in the engine, and clicks get counted.

const HEADERS = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" };

export async function GET(request: NextRequest, ctx: RouteContext<"/go/[id]">) {
  const { id } = await ctx.params;
  const resource = resourceById(id);
  if (!resource) return new Response("Not found", { status: 404, headers: HEADERS });

  // Shows up in Vercel's runtime logs until we add analytics. Only the path of
  // the page they came from is kept; no IPs or identifiers.
  console.log(
    JSON.stringify({ event: "outbound_click", resource: resource.id, affiliate: resource.affiliate, from: refererPath(request) }),
  );

  return new Response(null, { status: 302, headers: { ...HEADERS, Location: resource.url } });
}

function refererPath(request: NextRequest): string | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return url.host === request.nextUrl.host ? url.pathname : "external";
  } catch {
    return null;
  }
}
