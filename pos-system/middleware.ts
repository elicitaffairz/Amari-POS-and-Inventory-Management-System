import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/user-manual']
  const loginRoute = '/'
  
  const pathname = request.nextUrl.pathname
  
  // Get auth data from cookies (we'll set this on login)
  const hasAuthCookie = request.cookies.has('pos-user-id')
  
  // Allow access to login page for everyone (the page will show login form or app)
  if (pathname === loginRoute) {
    return NextResponse.next()
  }
  
  // Allow public routes for everyone
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // For all other routes, require authentication
  if (!hasAuthCookie) {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Authenticated users can access other routes
  return NextResponse.next()
}

export const config = {
  // Apply middleware only to app routes, not static assets/files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}
