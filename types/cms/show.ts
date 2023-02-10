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
  short_name: string,
}
