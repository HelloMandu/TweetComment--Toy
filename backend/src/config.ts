import dotenv from 'dotenv';
dotenv.config();

const required = (key: string, defaultValue?: string | number) => {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw Error(`Key ${key} is undefined`);
  }
  return value.toString();
};

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 43200)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('PORT', 8080)),
  },
};
