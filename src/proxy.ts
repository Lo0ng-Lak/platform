import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow API
  if (pathname.startsWith("/puck/api") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (req.method !== "GET") {
    return NextResponse.next();
  }

  // Canonical admin editors (no rewrite confusion)
  if (
    pathname === "/admin/header" ||
    pathname === "/admin/footer" ||
    pathname.startsWith("/admin/pages")
  ) {
    return NextResponse.next();
  }

  // Legacy aliases → admin
  if (pathname === "/edit/header") {
    return NextResponse.redirect(new URL("/admin/header", req.url));
  }
  if (pathname === "/edit/footer") {
    return NextResponse.redirect(new URL("/admin/footer", req.url));
  }

  // /edit → homepage body editor
  if (pathname === "/edit") {
    return NextResponse.rewrite(new URL("/admin/pages", req.url));
  }

  // /something/edit → body editor for that page
  if (pathname.endsWith("/edit")) {
    const pathWithoutEdit = pathname.slice(0, pathname.length - 5) || "/";
    const rewritePath =
      pathWithoutEdit === "/"
        ? "/admin/pages"
        : `/admin/pages${pathWithoutEdit}`;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  // Block raw /puck editor leftovers
  if (pathname === "/puck" || pathname.startsWith("/puck/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
