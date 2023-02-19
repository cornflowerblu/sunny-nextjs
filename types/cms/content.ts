export interface WebContent {
  cms_: any
  id: number
  attributes: WebContentAttributes
}

export interface WebContentAttributes {
  block_name: string
  content: string
  created_at: string
  updated_at: string
  published_at: string
}
