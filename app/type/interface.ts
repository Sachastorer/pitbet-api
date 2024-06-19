import Race from '#models/race'
import Qualifying from '#models/qualifying'
import Season from '#models/season'

export enum LeagueStatus {
  CREATED = 'created',
  STARTED = 'started',
  FINISHED = 'finished',
}

export enum SeasonStatus {
  CREATED = 'created',
  STARTED = 'started',
  FINISHED = 'finished',
}

export interface SeasonRacesQualifyings {
  season: Season
  races: Race[]
  qualifyings: Qualifying[]
}

export interface RaceResult {
  ranking: string[]
  times: string[]
}

export interface InputRace {
  year: number
  round: number
  past: boolean
  name: string
  circuit: string
  locality: string
  country: string
  id_api: number
  date: Date
  seasonId: number
}

export interface Iresult {
  results: string[]
  times: string[]
}

export interface InputDriver {
  driverId: string
  idApi: number
  name: string
  abbr: string
  nationality: string
  number: number
  dateOfBirth: string
  url: string
  team: string
  rank: number
  note: number
  price: number
  color: string
  salary: number
}
