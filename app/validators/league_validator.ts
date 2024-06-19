import vine from '@vinejs/vine'

export const createLeagueValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(32),
  })
)

export const joinLeagueValidator = vine.compile(
  vine.object({
    code: vine.string().minLength(9).maxLength(9),
  })
)
