// bin/lib/absolutePath.ts
import { resolve } from 'path'

export function absolutePath(path: string) {
  return resolve(`${__dirname}/../../${path}`)
}
