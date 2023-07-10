import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
  database: {
    URL: process.env.DATABASE_URL,
  },
  INTERVAL_TIME: "0 4 * * *",
  STORE_INTERVAL: "59 */1 * * *",
  MECHINE_ID: process.env.MACHINE_ID,
};
