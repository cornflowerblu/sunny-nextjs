export interface Show {
  show: any
  cms_: any
  id: number,
  attributes: ShowAttributes
}

export interface ShowAttributes {
  name: string,
  created_at: string,
  updated_at: string,
  published_at: string,
  slug: string,
  description: string,
  short_name: string,
  thumbnail: ImageAttributes,
}

export interface ImageAttributes {
  data: any
  url: string,
  alternativeText: string,
}