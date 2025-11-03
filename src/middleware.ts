import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Toutes les routes applicatives (hors assets et _next)
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Toujours pour les API
    '/(api|trpc)(.*)',
  ],
};
