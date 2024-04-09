import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class DBConfig {
  constructor() {
    this.DB_CONNECTION = process.env.DB_CONNECTION || "";
    this.DB_DSN = process.env.DB_DSN || "";
    this.DB_DATABASE = process.env.DB_DATABASE || "";
  }

  public DB_CONNECTION: string;
  public DB_DSN: string;
  public DB_DATABASE: string;
}

export const DB_CONFIG = new DBConfig();
