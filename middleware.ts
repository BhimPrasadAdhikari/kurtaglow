import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/', '/category', '/product', '/cart'], // Keep public routes as is
});

export const config = {
  matcher: [
    // Apply middleware to all routes except those defined in publicRoutes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Add orders route to ensure authentication check
    '/orders/:path*', // This ensures only signed-in users can access /orders and its sub-routes
  ],
};
