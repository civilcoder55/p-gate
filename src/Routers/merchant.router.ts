import express from "express";
import { MerchantController } from "../Controllers/merchant.controller";
import validate from "../Middlewares/validate.middleware"
import { createMerchantSchema } from "../Schemas/merchant.schema"
import requireAuth from "../Middlewares/auth.middleware"

const controller = new MerchantController();

const router: express.IRouter = express.Router();

router.post("/api/merchant", validate(createMerchantSchema), controller.create);
router.get("/api/merchant", requireAuth, controller.details);
router.get("/api/merchant/profile", requireAuth, controller.profile);
router.get("/api/merchant/transactions", requireAuth, controller.transactions);
export default router
