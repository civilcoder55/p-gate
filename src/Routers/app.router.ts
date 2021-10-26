import express from "express";
import requireAuth from "../Middlewares/auth.middleware"
import { AppController } from "../Controllers/app.controller"
import validate from "../Middlewares/validate.middleware"
import { AppDetailsSchema } from "../Schemas/app.schema";

const controller = new AppController();

const router: express.IRouter = express.Router();


router.post("/api/apps", requireAuth, validate(AppDetailsSchema), controller.create);
router.get("/api/apps/:id", requireAuth, controller.get);
router.get("/api/apps", requireAuth, controller.getAll);
router.put("/api/apps/:id", requireAuth, validate(AppDetailsSchema), controller.update);
router.delete("/api/apps/:id", requireAuth, controller.delete);
router.post("/api/apps/:id/regenerate", requireAuth, controller.regenerate);

export default router
