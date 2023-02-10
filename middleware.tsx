import { NextMiddleware, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Show } from './types/cms/show';


export const middleware: NextMiddleware = async (request: NextRequest) => {
  const { pathname } = new URL(request.url)
  const path = pathname.split('/')[2]

  if (+path >= 0) {
    return;
  }

  const showsData = await (await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v2/shows`)).json()

  const show: Show = showsData.cms_.shows.data.find((show: Show) => show.attributes.slug === path)

  return NextResponse.rewrite(new URL(`/shows/${show.id}`, request.url))
}


export const config = {
  matcher: '/shows/:slug*',
}