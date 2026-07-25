import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  // /path/edit -> /puck/path  (and /edit -> /puck)
  if (pathname === "/edit" || pathname.endsWith("/edit")) {
    const pathWithoutEdit =
      pathname === "/edit" ? "/" : pathname.slice(0, pathname.length - 5);
    const rewritePath =
      pathWithoutEdit === "/" ? "/puck" : `/puck${pathWithoutEdit}`;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  // Block direct access to /puck editor routes
  if (pathname === "/puck" || pathname.startsWith("/puck/")) {
    if (!pathname.startsWith("/puck/api")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
