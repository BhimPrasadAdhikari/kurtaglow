import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/', '/category', '/product:path'], // Routes that can be accessed without signing in
  ignoredRoutes: ['/orders'], // Prevent Clerk from checking auth for this route
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/orders', // Ensure this route is included in the matcher
  ],
};
