export interface Character {
  cms_: any
  id: number,
  attributes: CharacterAttributes
}

export interface CharacterAttributes {
  first_name: string,
  last_name: string,
  created_at: string,
  updated_at: string,
  image: Image
}

export interface Image {
  data: {
    id: number,
    attributes: ImageAttributes
  }
}

export interface ImageAttributes {
  name: string
  alternativeText: string
  caption?: string
  width?: number
  height?: number
  formats?: Formats
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url: string
  previewUrl?: string
  provider?: string
  provider_metadata?: ProviderMetadata
  createdAt?: string
  updatedAt?: string
}

export interface Formats {
  formatType: string,
  ext?: string
  url: string
  hash?: string
  mime?: string
  name?: string
  path?: any
  size?: number
  width?: number
  height?: number
  provider_metadata?: ProviderMetadata
}

export interface ProviderMetadata {
  public_id?: string
  variant_url?: string
  resource_type?: string
}