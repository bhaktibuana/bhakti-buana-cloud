import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class AppConfig {
  constructor() {
    this.PORT = process.env.PORT || "";
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.BASE_URL = process.env.BASE_URL || "";
  }

  public PORT: string;
  public NODE_ENV: string;
  public BASE_URL: string;
}

export const APP_CONFIG = new AppConfig();
