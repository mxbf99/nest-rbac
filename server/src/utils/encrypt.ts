import * as crypto from 'crypto';

export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('base64');
};

export const encrypt = (text: string, salt: string): string => {
  return crypto.pbkdf2Sync(text, salt, 10000, 32, 'sha256').toString('base64');
};
