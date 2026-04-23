import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',         // Arabic is the default (primary) language
  localeDetection: true        // Auto-detect from Accept-Language header on first visit
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};