import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const setCookie = (name: string, value: string) =>
  `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`

export default auth(req => {
  const { nextUrl } = req
  const isAuthenticated = req.auth != null

  if (!isAuthenticated && req.nextUrl.pathname !== '/') {
    const response = NextResponse.redirect(new URL('/', nextUrl.origin))
    response.headers.append(
      'Set-Cookie',
      setCookie('previousPage', nextUrl.pathname)
    )
    return response
  }
  if (isAuthenticated && req.nextUrl.pathname === '/') {
    const cookies = req.headers.get('cookie') || ''
    let previousPage =
      cookies.match(/(?:^|;\s*)previousPage=([^;]*)/)?.[1] || '/dashboard'
    if (previousPage === '/') previousPage = '/dashboard'
    const redirectUrl = new URL(previousPage, nextUrl.origin)

    const response = NextResponse.redirect(redirectUrl.toString())
    response.headers.append(
      'Set-Cookie',
      setCookie('previousPage', nextUrl.pathname)
    )
    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
