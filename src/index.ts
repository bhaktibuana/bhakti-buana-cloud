import { App } from "@/app";
import { APP_CONFIG } from "@/configs/app.config";

new App(parseInt(APP_CONFIG.PORT));
