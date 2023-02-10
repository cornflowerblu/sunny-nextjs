import { Show } from "./show"

export interface Season {
  cms_: any
  id: number,
  attributes: SeasonAttributes
}

export interface SeasonAttributes {
  season_number: number,
  created_at: string,
  updated_at: string,
  shows: Show[],
}
