export const generateCodeLeague = (): string => {
  let code = ''
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const dateIsPast = (date: string): boolean => {
  const dateNow = new Date()
  const dateRace = new Date(date)

  return dateRace.getTime() < dateNow.getTime()
}
