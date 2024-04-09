import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import { router } from "@/routers";
import { MongoConnection } from "@/database/mongo.database";
import { DB_CONFIG } from "@/configs/db.config";

export class App {
  constructor(port: number) {
    this.init();
    this.DBConnection(DB_CONFIG.DB_DSN);
    this.middlewares();
    this.routes();
    this.serve(port);
  }

  private app = express();

  private init(): void {
    /**
     * Block of Code that is executed before the app is run
     */
  }

  private DBConnection(uri: string): void {
    new MongoConnection(uri);
  }

  private middlewares(): void {
    this.app.enable("trust proxy");
    this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(process.cwd(), "public")));
    console.log(process.cwd());
  }

  private routes(): void {
    this.app.use("/", router);
  }

  private serve(port: number): void {
    this.app.listen(port, () => {
      console.log("App is running on port", port);
    });
  }
}
