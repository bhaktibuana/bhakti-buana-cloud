import { NextFunction, Request, Response, Router } from "express";

import apiRouter from "@/routers/api.router";
import { APP_CONFIG } from "@/configs/app.config";
import { httpResponse } from "@/helpers/httpResponse.helper";

class Routes {
  constructor() {
    this.routes();
  }

  public router = Router();

  private routes(): void {
    this.router.use((req: Request, res: Response, next: NextFunction): void => {
      if (APP_CONFIG.NODE_ENV === "production") {
        res.locals.baseUrl = APP_CONFIG.BASE_URL;
      } else {
        res.locals.baseUrl = `${req.protocol}://${req.headers.host}`;
      }
      next();
    });

    this.router.use("/api", apiRouter);
    this.router.use("/:anyRoute", (req: Request, res: Response): void => {
      const url = `${res.locals.baseUrl}${req.originalUrl}`;
      httpResponse(`URL not found: ${url}`, 404, res);
    });
    this.router.use("/", (_, res: Response): void => {
      const url = res.locals.baseUrl;
      httpResponse<{ url: string }>("Bhakti Buana Cloud", 200, res, { url });
    });
  }
}

const routes = new Routes();
export const router = routes.router;
