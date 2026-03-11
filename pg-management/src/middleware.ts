import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes protection
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/login", req.url));
    }

    // Student routes protection
    if (path.startsWith("/student/dashboard") && (!token || token.role !== "STUDENT")) {
      // Admins can also access student routes. If they can't, use token.role !== "STUDENT"
      if (token?.role !== "ADMIN") {
         return NextResponse.redirect(new URL("/student/login", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/student/login",
    }
  }
);

export const config = {
  matcher: ["/admin/:path*", "/student/dashboard/:path*"],
};
