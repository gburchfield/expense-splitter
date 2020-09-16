import {Logger, TempLog} from './types';

// Placeholder for logging, replace with a more formal logging library
let tempLog: TempLog
tempLog = (...args) => {
  console.log(...args)
}

const logger: Logger = {
  log: tempLog,
  error: tempLog
}

export default logger
