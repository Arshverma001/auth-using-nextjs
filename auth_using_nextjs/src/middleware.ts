import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token=request.cookies.get('token')?.value || ''
  const prof=path==='/profile/:profileId*'
  console.log(path)

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }

  if(prof && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }


}
 

export const config = {
  matcher:[
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:profileId*',
    '/verifyemail'
  ]
}