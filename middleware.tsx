import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Show } from './types/cms/show';



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url)
  const path = pathname.split('/')[2]

  if (+path >= 0) {
    return;
  }

  const showsData = await fetch('https://hasura.rurich.dev/api/rest/v2/shows')

  const shows: Show = await showsData.json()
  const show: Show = shows.cms_.shows.data.find((show: Show) => show.attributes.slug === path)

  return NextResponse.redirect(new URL(`/shows/${show.id}`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/shows/:slug*',
}