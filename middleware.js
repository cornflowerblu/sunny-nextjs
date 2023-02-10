import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'



// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { pathname } = new URL(request.url)
  const path = pathname.split('/')[2]

  if (path >= 0) {
    return;
  }

  const showsData = await fetch('https://hasura.rurich.dev/api/rest/v2/shows')

  const shows = await showsData.json()
  const show = await shows.cms_.shows.data.find((show) => show.attributes.slug === path)

  return NextResponse.redirect(new URL(`/shows/${show.id}`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/shows/:slug*',
}