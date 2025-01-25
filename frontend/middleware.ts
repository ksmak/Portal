import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !accessToken) {
    let url = new URL("/auth/login", request.url);
    url.searchParams.set("pathname", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};
