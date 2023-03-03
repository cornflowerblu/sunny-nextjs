import { NextMiddleware, NextResponse, NextRequest } from 'next/server'
import { Show } from './types/cms/show'

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const { pathname } = new URL(request.url)
  const path = pathname.split('/')[2]

  if (+path >= 0) {
    return
  }

  const showsData = await (
    await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v2/shows`)
  ).json()
  const show: Show = showsData.cms_.shows.data.find(
    (show: Show) => show.attributes.slug === path,
  )

  if (!show) {
    console.error('No show found')
    return NextResponse.redirect(new URL('/not-found', request.url))
  }

  return NextResponse.rewrite(new URL(`/shows/${show.id}`, request.url))
}

export const config = {
  matcher: '/shows/:slug*',
}
