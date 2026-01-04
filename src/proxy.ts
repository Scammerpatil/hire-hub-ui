import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPath = ["/"].includes(pathname);

  const token = req.cookies.get("authToken")?.value || "";
  const isLoggedIn = !!token;

  if (!isLoggedIn && !isPublicPath) {
    console.log("Not logged in, redirecting to public login page");
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (isLoggedIn) {
    const user = await fetch(
      `${process.env.SPRING_SERVER_URL}/api/auth/verify`,
      { credentials: "include", headers: { cookie: `authToken=${token}` } }
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => null);

    if (!user) {
      console.log("Token verification failed, redirecting to login");
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    const { role } = user;
    const dashboardPath = `/${role}/dashboard`;
    if (isPublicPath) {
      return NextResponse.redirect(new URL(dashboardPath, req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/company/:path*",
    "/candidate/:path*",
    "/employee/:path*",
  ],
};
