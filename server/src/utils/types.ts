
export type TempLog = (...args: any[]) => void

export interface Logger {
  log: TempLog,
  error: TempLog
}
