import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isEnglishEnabled } from "./i18n/locales";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (!isEnglishEnabled()) {
    const { pathname } = request.nextUrl;

    if (pathname === "/en" || pathname.startsWith("/en/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/en(\/|$)/, "/he$1");
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(he|en)/:path*"],
};
