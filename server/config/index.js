import dotenv from "dotenv"

dotenv.config()

/* eslint-disable no-undef */
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};
export default config;
