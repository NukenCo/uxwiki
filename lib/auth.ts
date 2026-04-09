import crypto from 'crypto'

const SALT = 'uxwiki-rd'

export function computeToken(password: string): string {
  return crypto.createHash('sha256').update(password + SALT).digest('hex')
}
