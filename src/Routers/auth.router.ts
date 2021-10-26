import express from "express";
import { AuthController } from "../Controllers/auth.controller";
import validate from "../Middlewares/validate.middleware"
import { MerchantLoginSchema } from "../Schemas/auth.schema";
import requireAuth from "../Middlewares/auth.middleware"

const controller = new AuthController();

const router: express.IRouter = express.Router();

router.post("/api/auth/login", validate(MerchantLoginSchema), controller.login);

export default router
