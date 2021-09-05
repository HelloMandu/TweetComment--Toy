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
  host: {
    port: parseInt(required('PORT', 3000)),
  },
  api: {
    url: required('REACT_APP_BASE_URL', 'http://localhost:8080'),
  },
};
