import { Season } from "./season"

export interface Episode {
  cms_: any
  id: number,
  attributes: EpisodeAttributes
}

export interface EpisodeAttributes {
  name: string,
  description: string,
  episode_number: number,
  created_at: string,
  updated_at: string,
  season: Season,
}